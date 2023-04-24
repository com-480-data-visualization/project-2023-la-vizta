package controllers

import models.{SpotifyCharts, SpotifyClean}
import models.Types._
import models.dao.{SpotifyChartsDAOImpl, SpotifyCleanDAO, SpotifyCleanDAOImpl}
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsPath, Json, Writes}
import play.api.mvc._

import javax.inject._
import scala.concurrent.{ExecutionContext, Future}

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
    
    def history(ids: Seq[(TrackId,Region)]): Action[AnyContent] = Action.async( {
        dao.history(ids).map( r => {
            val r_ = r.groupBy(_.region).map( kv => (kv._1,
                kv._2.groupBy(_.id).map( ts => (ts._1, ts._2.map( t => (t.date, t.rank, t.streams))))
            ))
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
