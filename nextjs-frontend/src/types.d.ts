export interface Route {
	getProps: () => any
    MapComponent: any;
    OverlayComponent: any
}

export interface DropdownOption {
    id: string;
    title: string;
    desc: string;
}

export type Geometry = string;

export type Title = string;
export type Artist = string;
export type Region = string;
export type Streams = number;
export type Rank = number;
export type Genre = string;
export interface SmallTrack {
    id: TrackId;
    title: Title;
    artist: Artist;
}
export interface Track extends SmallTrack {
    id: TrackId;
    title: Title;
    artist: Artist;
    region: Region;
    streams: Streams;
    rank: Rank;
    genre: Genre;
}

export type Color = string;

export type Lat = number;
export type Lng = number;
export type GeoJSON = string;

export interface Country {
    name: Region,
    lat: Lat, lng: Lng,
    geom: GeoJSON
}

export interface GenresPerRegion {
    tracksPerRegion: { [region: Region]: Track[] };
    topGenresPerRegion: { [region: Region]: Genre[] };
}
