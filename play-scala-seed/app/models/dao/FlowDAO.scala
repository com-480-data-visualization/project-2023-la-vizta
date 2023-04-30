package models.dao

import models.SpotifyClean
import models.Types._

import scala.concurrent.Future

trait FlowDAO {
    def track(id: TrackId): Future[Seq[(Region, Date, Rank, Streams)]]
    def tracks(): Future[Seq[(TrackId, Title, Artist)]]
}