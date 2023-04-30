package controllers

import models.Tracks
import models.Types._
import models.dao.{FlowDAO, FlowDAOImpl}
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsPath, Json, Writes}
import play.api.mvc._

import javax.inject._
import scala.concurrent.ExecutionContext

@Singleton
class FlowController @Inject()(val dbConfigProvider: DatabaseConfigProvider, val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {
    
    val dao: FlowDAO = new FlowDAOImpl(dbConfigProvider)
    
    case class RankStreams(rank: Rank, streams: Streams)
    
    implicit val rankStreamsWrites: Writes[RankStreams] = (
        (JsPath \ "rank").write[Rank] and
        (JsPath \ "streams").write[Streams]
    )(unlift(RankStreams.unapply))
    
    implicit val tracksWrites: Writes[Tracks] = (
        (JsPath \ "id").write[TrackId] and
        (JsPath \ "title").write[Title] and
        (JsPath \ "artist").write[Artist]
    )(unlift(Tracks.unapply))

    def track(id: TrackId): Action[AnyContent] = Action.async({
        dao.track(id).map(r => {
            val r_ = r
                .groupBy(_._2)
                .view.mapValues( date => date
                    .groupBy(_._1)
                    .view.mapValues(regions => RankStreams(regions.head._3, regions.head._4) )
                )
            Ok(Json.toJson(r_))
        })
    })
    
    def tracks(): Action[AnyContent] = Action.async({
        dao.tracks().map(r => {
            val r_ = r map { case (id, title, artist) => Tracks(id, title, artist) }
            Ok(Json.toJson(r_))
        })
    })
}
