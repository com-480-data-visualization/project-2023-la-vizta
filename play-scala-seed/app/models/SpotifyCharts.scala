package models

import models.Types.{Rank, Title, Date, Artist, Url, Region, Chart, Trend, Streams}

case class SpotifyCharts(
	                        title: Title,
	                        rank: Rank,
	                        date: Date,
	                        artist: Artist,
	                        url: Url,
	                        region: Region,
	                        chart: Chart,
	                        trend: Trend,
	                        streams: Streams );
