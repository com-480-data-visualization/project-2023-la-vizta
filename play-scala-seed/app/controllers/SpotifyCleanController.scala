package controllers

import models.{SpotifyCharts, SpotifyClean}
import models.Types._
import models.dao.{SpotifyChartsDAOImpl, SpotifyCleanDAOImpl}
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsPath, Json, Writes}
import play.api.mvc._

import javax.inject._
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class SpotifyCleanController @Inject()(val dbConfigProvider: DatabaseConfigProvider, val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {

    val dao = new SpotifyCleanDAOImpl(dbConfigProvider)

    implicit val spotifyCleanChartsWrites: Writes[SpotifyClean] = (
        (JsPath \ "title").write[Title] and
        (JsPath \ "artist").write[Artist] and
        (JsPath \ "date").write[Date] and
        (JsPath \ "rank").write[Rank] and
        (JsPath \ "id").write[TrackId] and
        (JsPath \ "region").write[Region] and
        (JsPath \ "streams").write[Streams]
    ) (unlift(SpotifyClean.unapply))
    
    def test = Action.async( {
        dao.test().map( r => {
            Ok(Json.toJson(r))
        })
    })
}
