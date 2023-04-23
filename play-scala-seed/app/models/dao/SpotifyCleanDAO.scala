package models.dao

import models.SpotifyClean
import models.Types._

import scala.concurrent.Future

trait SpotifyCleanDAO {
    def withDate(date: String): Future[Seq[SpotifyClean]]
    def history(tracks: Set[TrackId]): Future[Seq[SpotifyClean]]
}