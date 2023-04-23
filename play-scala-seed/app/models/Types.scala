package models

object Types {
	// From country
	type CountryId = Int
	type Geometry = String

	// From spotify_charts
	type Title = String
	type Rank = Int
	type Date = String
	type Artist = String
	type Url = String
	type Region = String
	type Chart = String
	type Trend = String
	type Streams = Int

	// From genre
	type GenreId = Int
	type Genre = String
	
	// From SpotifyClean
	type TrackId = String
}
