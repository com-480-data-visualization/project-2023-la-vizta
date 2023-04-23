package models.dao

import models.SpotifyClean
import models.Types._
import models.table.SpotifyCleanTable
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.PostgresProfile.api._
import slick.jdbc.{GetResult, JdbcProfile}
import slick.lifted.TableQuery

import javax.inject.Inject
import scala.concurrent.Future

class SpotifyCleanDAOImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends SpotifyCleanDAO {

    private lazy val charts = TableQuery[SpotifyCleanTable]

    private val db = dbConfigProvider.get[JdbcProfile].db

    implicit val getSpotifyCleanResult: GetResult[SpotifyClean] = GetResult(r =>
        SpotifyClean(r.<<, r.<<, r.<<, r.<<, r.<<, r.<<, r.<<)
    )

    def test(): Future[Seq[Any]] =
        db run {
            ???
        }
}
