package models.table

import models.SpotifyClean
import models.Types._
import slick.jdbc.PostgresProfile.api._

class SpotifyCleanTable(tag: Tag) extends Table[SpotifyClean](_tableTag = tag, _tableName = "spotify_clean") {

	def title = column[Title]("title")
	def artist = column[Artist]("artist")
	def date = column[Date]("date")
	def rank = column[Rank]("rank")
	def id = column[TrackId]("id")
	def region = column[Region]("region")
	def streams = column[Streams]("streams")

	def * = (title, artist, date, rank, id, region, streams) <> (SpotifyClean.tupled, SpotifyClean.unapply)
}
