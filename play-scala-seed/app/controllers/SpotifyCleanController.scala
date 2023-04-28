package controllers

import models.SpotifyClean
import models.Types._
import models.dao.{SpotifyCleanDAO, SpotifyCleanDAOImpl}
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsPath, Json, Writes}
import play.api.mvc._

import javax.inject._
import scala.concurrent.ExecutionContext

@Singleton
class SpotifyCleanController @Inject()(val dbConfigProvider: DatabaseConfigProvider, val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {
    
    val dao: SpotifyCleanDAO = new SpotifyCleanDAOImpl(dbConfigProvider)
    
    case class History( dates: Seq[Date], ranks: Seq[Rank], streams: Seq[Streams] )
    
    implicit val historyWrites: Writes[History] = (
        (JsPath \ "dates").write[Seq[Date]] and
        (JsPath \ "ranks").write[Seq[Rank]] and
        (JsPath \ "streams").write[Seq[Streams]]
    )(unlift(History.unapply))
    
    def histories(region: Region, ids: Seq[TrackId]): Action[AnyContent] = Action.async( {
        dao.histories(region, ids).map( r => {
            val r_ = r
                .groupBy(_.id)
                .view
                .mapValues( data => History(
                    data.map(_.date),
                    data.map(_.rank),
                    data.map(_.streams)
                ) )
            Ok(Json.toJson(r_))
        })
    })
}
