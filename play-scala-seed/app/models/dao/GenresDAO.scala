package models.dao

import models.Types.{Artist, Genre, TrackId, Rank, Region, Streams, Title}
import models.table.GenresTable

import scala.concurrent.Future

trait GenresDAO {
	def get: Future[Seq[(TrackId, Title, Artist, Region, Streams, Rank, Genre)]]
}