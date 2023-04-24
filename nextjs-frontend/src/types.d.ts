import { paletteGenre } from "~/constants"

export type Geometry = string
export type RegionGeometry = [Region, Geometry]

export type GenreId = number
export type Title = string
export type Artist = string
export type Region = string
export type Streams = number
export type Rank = number
export type GenreName = string
export interface Track {
    id: GenreId
    title: Title
    artist: Artist
    region: Region
    streams: Streams
    rank: Rank
    genreName: GenreName
}
export type Color = string

export type TracksPerRegion = {[region: Region]: Track[]}
export type TopGenresPerRegion = {[region: Region]: GenreName[]}

// countries
export type ISO = string
export type Lat = number
export type Lng = number
export type GeoJSON = string
export type Countries = [Region, ISO, Lat, Lng, GeoJSON] // as received from /countries/all