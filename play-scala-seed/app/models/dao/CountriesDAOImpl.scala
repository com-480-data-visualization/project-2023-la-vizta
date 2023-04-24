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
    
//    implicit val getCountriesResult: GetResult[Countries] = GetResult(r =>
//        Countries(r.<<, r.<<, r.<<, r.<<, r.<<, r.<<)
//    )

    def getAll: Future[Vector[(Region, ISO, Lat, Lng, GeoJSON)]] =
        db run {
            sql"""
				SELECT "name", "iso", "lat", "lng", ST_AsGeoJSON("geom")
	            FROM countries
            """.as[(Region, ISO, Lat, Lng, GeoJSON)]
        }
}
