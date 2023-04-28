package controllers

import models.Genres
import models.Types.{Artist, Genre, Rank, Region, Streams, Title, TrackId}
import models.dao.{GenresDAO, GenresDAOImpl}
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsPath, Json, Writes}
import play.api.mvc._
import slick.jdbc.GetResult

import javax.inject._
import scala.concurrent.{ExecutionContext, Future}
import scala.language.postfixOps

@Singleton
class GenresController @Inject()(val dbConfigProvider: DatabaseConfigProvider, val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {
    
    val dao: GenresDAO = new GenresDAOImpl(dbConfigProvider)
    
    case class ResGenres(
      tracksPerRegion: Map[Region, Seq[GenreWithTrack]],
      topGenresPerRegion: Map[Region, Seq[Genre]]
    )

    implicit val genresWrites: Writes[GenreWithTrack] = (
        (JsPath \ "id").write[TrackId] and
        (JsPath \ "title").write[Title] and
        (JsPath \ "artist").write[Artist] and
        (JsPath \ "region").write[Region] and
        (JsPath \ "streams").write[Streams] and
        (JsPath \ "rank").write[Rank] and
        (JsPath \ "genre").write[Genre]
    )(unlift(GenreWithTrack.unapply))

    implicit val resGenresWrites: Writes[ResGenres] = (
        (JsPath \ "tracksPerRegion").write[Map[Region, Seq[GenreWithTrack]]] and
        (JsPath \ "topGenresPerRegion").write[Map[Region, Seq[Genre]]]
    )(unlift(ResGenres.unapply))

    case class GenreWithTrack(
         id: TrackId, title: Title, artist: Artist,
         region: Region, streams: Streams,
         rank: Rank, genre: Genre )

    def getGenres: Action[AnyContent] = Action.async {
        dao.getGenres.map( r => {
            val tracksPerRegion = r
                .map(GenreWithTrack tupled)
                .groupBy(_.region)

            val topGenresPerRegion = tracksPerRegion
              .view
              .mapValues(_.groupBy(_.genre))
              .mapValues( m => m.view
                .mapValues(_.foldLeft(0)((acc, cur) => acc + cur.streams))
                .toSeq
                .sortBy(-_._2)
                .map(_._1)
              )
              .toMap

            val res = ResGenres(tracksPerRegion, topGenresPerRegion)
            Ok(Json.toJson(res))
        } )
    }
}
