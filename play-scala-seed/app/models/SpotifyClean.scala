package models

import models.Types._

case class SpotifyClean(
	               id: TrackId,
	               date: Date,
	               rank: Rank,
	               region: Region,
	               streams: Streams );
