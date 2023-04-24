package models.dao

import models.SpotifyClean
import models.Types._

import scala.concurrent.Future

trait SpotifyCleanDAO {
    def history(id: TrackId): Future[Seq[(Region, Date, Rank, Streams)]]
    def histories(ids: Seq[(TrackId, Region)]): Future[Seq[SpotifyClean]]
    def date(d: Date): Future[Seq[(TrackId, Title, Artist, Region, Rank, Streams)]]
}