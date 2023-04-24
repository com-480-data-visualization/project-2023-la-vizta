package models

import models.Types.{Artist, Date, Rank, Region, Title, Url, Chart, Trend, Streams}

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
