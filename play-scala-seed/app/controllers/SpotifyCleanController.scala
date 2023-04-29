package controllers

import models.SpotifyClean
import models.Types._
import models.dao.{SpotifyCleanDAO, SpotifyCleanDAOImpl}
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.JsonConfiguration.Aux
import play.api.libs.json.{JsPath, Json, JsonConfiguration, OptionHandlers, Writes}
import play.api.mvc._

import javax.inject._
import scala.collection.MapView
import scala.concurrent.ExecutionContext

@Singleton
class SpotifyCleanController @Inject()(val dbConfigProvider: DatabaseConfigProvider, val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {
    
    val dao: SpotifyCleanDAO = new SpotifyCleanDAOImpl(dbConfigProvider)
    
    case class Ranked( id: TrackId, rank: Rank )
    case class DatedRanked( date: Date, ranked: Seq[Ranked] )
    
    implicit val rankWrites: Writes[Ranked] = (
        (JsPath \ "id").write[TrackId] and
        (JsPath \ "rank").write[Rank]
    )(unlift(Ranked.unapply))
    
    implicit val datedRankedWrites: Writes[DatedRanked] = (
        (JsPath \ "date").write[Date] and
        (JsPath \ "ranked").write[Seq[Ranked]]
    )(unlift(DatedRanked.unapply))
    
    def histories(region: Region, ids: Seq[TrackId]): Action[AnyContent] = Action.async({
        dao.histories(region, ids).map(r => {
            val rr = r.toBuffer
            val groupedByDates = r.groupBy(_._2) map {
                case (date, tracks) => (date, tracks.map(_._1))
            }
            groupedByDates foreach {
                case (d, vec) => rr.appendAll(ids.diff(vec).map(id => (id, d, -1, -1)))
            }
            val res = rr
                .groupBy(_._2)
                .map { case (d, buf) => DatedRanked(d, buf.toSeq.map( t => Ranked(t._1, t._3) ) ) }
                .toSeq
                .sortBy(_.date)
            Ok(Json.toJson(res))
        })
    })
}
