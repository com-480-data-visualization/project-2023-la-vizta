package models.dao

import models.Genres
import models.Types.{Artist, Genre, Rank, Region, Streams, Title, TrackId}
import models.table.{GenresTable, TracksTable}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.{GetResult, JdbcProfile}
import slick.jdbc.PostgresProfile.api._
import slick.lifted.TableQuery

import javax.inject.Inject
import scala.concurrent.Future

class GenresDAOImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends GenresDAO {
	
	private lazy val genres = TableQuery[GenresTable]
	private lazy val tracks = TableQuery[TracksTable]
	
	private val db = dbConfigProvider.get[JdbcProfile].db

	def get: Future[Seq[(TrackId, Title, Artist, Region, Streams, Rank, Genre)]] =
		db run {
			val q = for {
				g <- genres
				t <- tracks
				if t.id === g.id
			} yield (t.id, t.title, t.artist, g.region, g.streams, g.rank, g.genres)
			q.result
		}
}