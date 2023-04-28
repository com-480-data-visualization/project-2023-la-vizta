package models.dao

import models.SpotifyClean
import models.Types._
import models.table.{SpotifyCleanTable, TracksTable}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.PostgresProfile.api._
import slick.jdbc.{GetResult, JdbcProfile}
import slick.lifted.TableQuery

import javax.inject.Inject
import scala.concurrent.Future

class SpotifyCleanDAOImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends SpotifyCleanDAO {
    
    private lazy val spotify = TableQuery[SpotifyCleanTable]
    private lazy val tracks = TableQuery[TracksTable]

    private val db = dbConfigProvider.get[JdbcProfile].db

    implicit val getSpotifyCleanResult: GetResult[SpotifyClean] = GetResult( r =>
        SpotifyClean(r.<<, r.<<, r.<<, r.<<, r.<<)
    )
    
//    def histories(region: Region, ids: Seq[TrackId]): Future[Seq[SpotifyClean]] = {
//        val idsString = ids.map(v => f"('${v._1}','${v._2}')").mkString("(", ",", ")")
//        db run {
//            sql"""
//			select * from spotify_clean
//			where (id, region) in #${idsString}
//			""".as[SpotifyClean]
//        }
//    }
    
    def histories(region: Region, ids: Seq[TrackId]): Future[Seq[SpotifyClean]] = {
        db run {
            val q = for (
                s <- spotify
                if s.region === region && s.id.inSetBind(ids)
            ) yield s
            q.result
        }
    }
}
