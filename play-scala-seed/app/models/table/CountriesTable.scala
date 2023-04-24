package models.table

import models.Countries
import models.Types.{CountryId, Geometry, ISO, Lat, Lng, Region}
import slick.jdbc.PostgresProfile.api._

class CountriesTable(tag: Tag) extends Table[Countries](_tableTag = tag, _tableName = "countries") {
	
	def id = column[CountryId]("id", O.PrimaryKey)
	def iso = column[ISO]("iso")
	def name = column[Region]("name")
	def lat = column[Lat]("lat")
	def lng = column[Lng]("lng")
	def geom = column[Geometry]("geom")

	def * = (id, iso, name, lat, lng, geom) <> (Countries.tupled, Countries.unapply)
}
