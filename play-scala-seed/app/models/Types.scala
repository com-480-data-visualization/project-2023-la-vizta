package models

object Types {
	// From countries
	type CountryId = Int
	type ISO = String
	type Lat = Double
	type Lng = Double
	type Geometry = String
	type GeoJSON = String

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
	
	// From tracks
	type TrackId = String
}
