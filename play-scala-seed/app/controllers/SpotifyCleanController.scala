package controllers

import models.{SpotifyCharts, SpotifyClean}
import models.Types._
import models.dao.{SpotifyChartsDAOImpl, SpotifyCleanDAO, SpotifyCleanDAOImpl}
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsPath, Json, Writes}
import play.api.mvc._
import slick.jdbc.GetResult

import javax.inject._
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class SpotifyCleanController @Inject()(val dbConfigProvider: DatabaseConfigProvider, val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {

    val dao: SpotifyCleanDAO = new SpotifyCleanDAOImpl(dbConfigProvider)
    
    implicit val getSpotifyChartsResult: GetResult[SpotifyClean] = GetResult(r =>
        SpotifyClean(r.<<, r.<<, r.<<, r.<<, r.<<)
    )
    
    def withDate(date: Date): Action[AnyContent] = Action.async( {
        dao.withDate(date).map( r => {
            val r_ = r.map( c => SpotifyClean.unapply(c).get )
            Ok(Json.toJson(r_))
        })
    })
    
    def history(tracks: Set[TrackId]): Action[AnyContent] = Action.async({
        dao.history(tracks).map(r => {
            val r_ = r.map( c => SpotifyClean.unapply(c).get )
            Ok(Json.toJson(r_))
        })
    })
}
