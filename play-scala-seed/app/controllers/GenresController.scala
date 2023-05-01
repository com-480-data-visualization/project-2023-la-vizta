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
        tracks: Map[Region, Seq[GenreWithTrack]],
        genres: Map[Region, Genre]
    )
    
    case class GenreWithTrack(
        id: TrackId, title: Title, artist: Artist,
        region: Region, streams: Streams,
        rank: Rank, genres: Genre )

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
        (JsPath \ "tracks").write[Map[Region, Seq[GenreWithTrack]]] and
        (JsPath \ "genres").write[Map[Region, Genre]]
    )(unlift(ResGenres.unapply))


    def get: Action[AnyContent] = Action.async {
        dao.get.map( r => {
            val tracks = r
                .map(GenreWithTrack tupled)
                .groupBy(_.region)
            val genres = tracks map { case (region, ts) => {
                val gs = ts.flatMap(t => t.genres.split(",").map(g => (t.streams, g)))
                (region, gs.groupBy(_._2).view.mapValues(seq => seq.map(_._1).sum).maxBy(_._2)._1)
            } }
            val res = ResGenres(tracks, genres)
            Ok(Json.toJson(res))
        } )
    }
}
