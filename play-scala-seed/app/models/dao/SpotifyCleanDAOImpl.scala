package models.dao

import models.SpotifyClean
import models.Types._
import models.table.{SpotifyCleanTable, TrackTable}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.PostgresProfile.api._
import slick.jdbc.{GetResult, JdbcProfile}
import slick.lifted.TableQuery

import javax.inject.Inject
import scala.concurrent.Future

class SpotifyCleanDAOImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends SpotifyCleanDAO {
    
    private lazy val spotify = TableQuery[SpotifyCleanTable]
    private lazy val tracks = TableQuery[TrackTable]

    private val db = dbConfigProvider.get[JdbcProfile].db

    implicit val getSpotifyCleanResult: GetResult[SpotifyClean] = GetResult(r =>
        SpotifyClean(r.<<, r.<<, r.<<, r.<<, r.<<)
    )
    
    def withDate(date: String): Future[Seq[SpotifyClean]] = {
        db run {
            val q = for {
                s <- spotify; t <- tracks
               if s.id === t.id && s.date === date
            } yield s
            q.result
        }
    }
    
    def history(tracks: Set[TrackId]): Future[Seq[SpotifyClean]] = {
        db run {
            val q = for {
                track <- spotify
                if track.id inSetBind tracks
            } yield track
            q.result
        }
    }
}
