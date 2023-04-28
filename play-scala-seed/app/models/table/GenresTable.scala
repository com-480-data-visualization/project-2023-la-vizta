package models.table

import models.Genres
import models.Types.{Genre, TrackId, Rank, Region, Streams}
import slick.jdbc.PostgresProfile.api._

class GenresTable(tag: Tag) extends Table[Genres](_tableTag = tag, _tableName = "genres") {

	def id = column[TrackId]("id")
	def region = column[Region]("region")
	def streams = column[Streams]("streams")
	def rank = column[Rank]("rank")
	def genre = column[Genre]("genre")

	def * = (id, region, streams, rank, genre) <> (Genres.tupled, Genres.unapply)
}
