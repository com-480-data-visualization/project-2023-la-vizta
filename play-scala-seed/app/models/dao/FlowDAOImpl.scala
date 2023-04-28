package models.dao

import models.Types._
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.PostgresProfile.api._
import slick.jdbc.JdbcProfile

import javax.inject.Inject
import scala.concurrent.Future

class FlowDAOImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends FlowDAO {

    private val db = dbConfigProvider.get[JdbcProfile].db

    def track(id: TrackId): Future[Seq[(Region, Date, Rank, Streams)]] = {
        db run {
            sql"""
				SELECT "region", DATE_TRUNC('week', "date"), AVG("rank")::INTEGER as "rank", sum("streams") as "streams"
				FROM spotify_clean
				WHERE "id" = $id
				GROUP BY DATE_TRUNC('week', "date"), "region"
				ORDER BY DATE_TRUNC('week', "date")
			""".as[(Region, Date, Rank, Streams)]
        }
    }
    
    def tracks(): Future[Seq[(Title, Artist, TrackId)]] =
        db run {
            sql"""
				SELECT title, artist, s."id"
				FROM (public.spotify_clean as s join tracks as t on s.id = t.id)
				GROUP BY title, artist, s."id"
				ORDER BY count(DISTINCT "region")  desc
				LIMIT 10
			""".as[(Title, Artist, TrackId)]
        }
}
