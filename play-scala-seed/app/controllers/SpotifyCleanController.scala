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

    implicit val spotifyCleanChartsWrites: Writes[SpotifyClean] = (
        (JsPath \ "id").write[TrackId] and
        (JsPath \ "date").write[Date] and
        (JsPath \ "rank").write[Rank] and
        (JsPath \ "region").write[Region] and
        (JsPath \ "streams").write[Streams]
    ) (unlift(SpotifyClean.unapply))
    
    def track(id: TrackId): Action[AnyContent] = Action.async({
        dao.flowTrack(id).map(r => {
            val r_ = r
                .groupBy(_._2)
                .view.mapValues( date => date
                    .groupBy(_._1)
                    .view.mapValues(regions => (regions.head._3, regions.head._4) )
                )
            Ok(Json.toJson(r_))
        })
    })
    
    def tracks(): Action[AnyContent] = Action.async({
        dao.flowTracks().map(r => {
            Ok(Json.toJson(r))
        })
    })
    
    def history(id: TrackId): Action[AnyContent] = Action.async({
        dao.history(id).map(r => {
            val r_ = r.sortBy(_._2)
            Ok(Json.toJson(r_))
        })
    })
    
    def histories(region: Region, ids: Seq[TrackId]): Action[AnyContent] = Action.async( {
        dao.histories(region, ids).map( r => {
            val r_ = r
                .groupBy(_.id)
                .view
                .mapValues( data => (
                    data.map(_.date),
                    data.map(_.rank),
                    data.map(_.streams)
                ) )
            Ok(Json.toJson(r_))
        })
    })
    
    def date(d: Date): Action[AnyContent] = Action.async({
        dao.date(d).map(r => {
            val r_ = r.groupBy(_._4).map( kv => (kv._1,
                kv._2.map( t => (t._1, t._2, t._3, t._5, t._6) )
            ))
            Ok(Json.toJson(r_))
        })
    })
}
