package models.table

import models.Genres
import models.Types.{Genre, Rank, Region, Streams, TrackId}
import slick.jdbc.PostgresProfile
import slick.jdbc.PostgresProfile.api._

class GenresTable(tag: Tag) extends Table[Genres](_tableTag = tag, _tableName = "new_genres") {
	
	def id = column[TrackId]("id")
	def region = column[Region]("region")
	def streams = column[Streams]("streams")
	def rank = column[Rank]("rank")
	def genres = column[Genre]("genres")

	def * = (id, region, streams, rank, genres) <> (Genres.tupled, Genres.unapply)
}
