package models.dao

import models.Types.{GeoJSON, ISO, Lat, Lng, Region}

import scala.concurrent.Future

trait CountriesDAO {
	def getAll: Future[Vector[(Region, Lat, Lng, GeoJSON)]]
}