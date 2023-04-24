package models

case class SpotifyCharts(
	               title: String,
	               rank: Int,
	               date: String,
	               artist: String,
	               url: String,
	               region: String,
	               chart: String,
	               trend: String,
	               streams: Int );
