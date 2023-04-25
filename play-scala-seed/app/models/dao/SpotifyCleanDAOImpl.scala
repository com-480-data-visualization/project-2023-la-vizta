package models.dao

import models.SpotifyClean
import models.Types._
import models.table.{SpotifyCleanTable, TracksTable}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.PostgresProfile.api._
import slick.jdbc.{GetResult, JdbcProfile, SetParameter}
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
    
    def flow(id: TrackId): Future[Seq[(Region, Date, Rank, Streams)]] = {
        db run {
            sql"""
                select "region", DATE_TRUNC('week', "date"), avg("rank")::INTEGER as "rank", sum("streams") as "streams"
                from spotify_clean
                where "id" = $id
                group by DATE_TRUNC('week', "date"), "region"
            """.as[(Region, Date, Rank, Streams)]
        }
    }
    
    def history(id: TrackId): Future[Seq[(Region, Date, Rank, Streams)]] = {
        db run {
            val q = for {
                s <- spotify;
                if s.id === id
            } yield (s.region, s.date, s.rank, s.streams)
            q.result
        }
    }
    
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
                if ( s.region === region && s.id.inSetBind(ids)  )
            ) yield s
            q.result
        }
    }
    
    def date(d: Date): Future[Seq[(TrackId, Title, Artist, Region, Rank, Streams)]] =
        db run {
            val q = for {
                s <- spotify; t <- tracks
                if s.id === t.id && s.date === d
            } yield (s.id, t.title, t.artist, s.region, s.rank, s.streams);
            q.result
        }
}
