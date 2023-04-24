package models.table

import models.{SpotifyClean, Tracks}
import models.Types._
import slick.jdbc.PostgresProfile.api._

class TracksTable(tag: Tag) extends Table[Tracks](_tableTag = tag, _tableName = "tracks") {
	
	def id = column[TrackId]("id", O.PrimaryKey)
	def title = column[Title]("title")
	def artist = column[Artist]("artist")

	def * = (id, title, artist) <> (Tracks.tupled, Tracks.unapply)
}
