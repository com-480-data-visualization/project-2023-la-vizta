import { paletteGenre } from "~/constants";
import { Region, Track, GenreName, Color } from "~/types";
import StreamChart from "./StreamChart";

// const rankColors = [
//     '#CBAA18',
//     '#A2A19D',
//     '#CC7E18',
//     '#3E9A9D',
//     '#3E9A9D'
// ]

const rankColors = ["#FF9D00", "#FF5400", "#B01A2E", "#0A9A9A", "#9A649A"];

interface IRegionPopup {
  region: Region;
  topGenres: GenreName[];
  tracks: Track[];
}

interface ICGenre {
  i: number;
  genre: string;
  color: string;
}

const CGenre = ({ i, genre, color }: ICGenre) => {
  const fontGenres = ["xx-large", "x-large", "large", "small", "small"];
  return (
    <p
      className="font-Quicksand pb-2 leading-none"
      style={{ color: color, fontSize: fontGenres[i - 1] }}
    >
      {genre}
    </p>
  );
};

const CTrack = ({ i, track }: { i: number; track: Track }) => {
  console.log(track.genre);
  return (
    <div>
      <h4 className="max-w-md text-lg font-semibold font-Azeret mb-[-5px] whitespace-nowrap text-ellipsis overflow-hidden mt-2">
        <span style={{ color: rankColors[i - 1] }}>{i}.</span> {track.title}
      </h4>
      <div className="flex flex-row">
        <p className="font-Quicksand ml-1 whitespace-nowrap text-ellipsis">
          {track.artist}
        </p>
        <p
          className="font-Quicksand ml-auto whitespace-nowrap text-ellipsis"
          style={{ color: rankColors[i - 1] }}
        >
          {track.genre}
        </p>
      </div>
    </div>
  );
};

const RegionPopup = ({ region, topGenres, tracks }: IRegionPopup) => {
  return (
    <div className="absolute left-1 p-4 z-[9000] rounded backdrop-blur bg-[color:var(--white)]">
      <div className="m-auto max-w-min whitespace-nowrap font-Playfair text-2xl">
        {region}
      </div>
      <div className="m-auto w-14 border-t-2 border-black mt-1 mb-3"></div>
      <div className="flex text-base font-Jetbrains">
        <div className="flex flex-col pr-6 text-base font-Jetbrains">
          {tracks.map((track, j) => (
            <CTrack key={`track-${j}`} i={j + 1} track={track} />
          ))}
        </div>
        <StreamChart tracks={tracks} color={rankColors} />
      </div>
    </div>
  );
};

export default RegionPopup;
