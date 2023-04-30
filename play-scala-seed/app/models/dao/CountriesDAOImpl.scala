package models.dao

import models.Types._
import models.table.CountriesTable
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.PostgresProfile.api._
import slick.jdbc.{GetResult, JdbcProfile}
import slick.lifted.TableQuery

import javax.inject.Inject
import scala.concurrent.Future

class CountriesDAOImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends CountriesDAO {

    private lazy val countries = TableQuery[CountriesTable]
    private val db = dbConfigProvider.get[JdbcProfile].db
    
    def getAll: Future[Vector[(Region, Lat, Lng, GeoJSON)]] =
        db run {
            sql"""
				SELECT "name", "lat", "lng", ST_AsGeoJSON("geom")
	            FROM countries
            """.as[(Region, Lat, Lng, GeoJSON)]
        }
}
