package models.dao

import models.Types._

import scala.concurrent.Future

trait SpotifyCleanDAO {
    def test: Future[Vector[Any]]
}