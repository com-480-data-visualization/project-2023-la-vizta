package models

import models.Types.{Genre, TrackId, Rank, Region, Streams}

case class Genres(
                  id: TrackId,
				  region: Region,
				  streams: Streams,
				  ranking: Rank,
				  genres: Genre );
