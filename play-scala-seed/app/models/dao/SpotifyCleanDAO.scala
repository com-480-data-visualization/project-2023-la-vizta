package models.dao

import models.SpotifyClean
import models.Types._

import scala.concurrent.Future

trait SpotifyCleanDAO {
    def histories(region: Region, ids: Seq[TrackId]): Future[Seq[(TrackId, Date, Rank, Streams)]]
}