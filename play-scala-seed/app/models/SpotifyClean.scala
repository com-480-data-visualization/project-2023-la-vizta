package models

import models.Types._

case class SpotifyClean(
	               title: Title,
	               artist: Artist,
	               date: Date,
	               rank: Rank,
	               id: TrackId,
	               region: Region,
	               streams: Streams );
