package models.table

import models.{SpotifyClean, Track}
import models.Types._
import slick.jdbc.PostgresProfile.api._

class TrackTable(tag: Tag) extends Table[Track](_tableTag = tag, _tableName = "tracks") {
	
	def id = column[TrackId]("id")
	def title = column[Title]("title")
	def artist = column[Artist]("artist")

	def * = (id, title, artist) <> (Track.tupled, Track.unapply)
}
