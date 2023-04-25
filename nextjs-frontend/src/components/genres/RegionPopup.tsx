import StreamChart from "./StreamChart";

import { GENRE_COLORS, CHART_COLORS } from '~/constants';
import { Region, Track, GenreName, Color } from "~/types";

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
  return (
    <div>
      <h4 className="max-w-md text-lg font-semibold font-Azeret mb-[-5px] whitespace-nowrap text-ellipsis overflow-hidden mt-2">
        <span style={{ color: CHART_COLORS[i - 1] }}>{i}.</span> {track.title}
      </h4>
      <div className="flex flex-row">
        <p className="font-Quicksand ml-1 whitespace-nowrap w-[80%] text-ellipsis">
          {track.artist}
        </p>
        <p
          className="font-Quicksand ml-auto whitespace-nowrap text-ellipsis"
          style={{ color: GENRE_COLORS[track.genre] }}
        >
          {track.genre}
        </p>
      </div>
    </div>
  );
};

const RegionPopup = ({ region, topGenres, tracks }: IRegionPopup) => {
	return (
		<div className="absolute flex left-10 top-24 px-6 py-4 z-[9000] rounded backdrop-blur bg-[color:var(--white)]">
			<div>
				<div className="font-Playfair text-3xl mb-5 underline underline-offset-[10px]">
					{region}
				</div>
				<div className="flex flex-col text-base font-Jetbrains">
					{tracks.map((track, j) => (
						<CTrack key={`track-${j}`} i={j + 1} track={track} />
					))}
				</div>
			</div>
			<StreamChart tracks={tracks} />
		</div>
	);
};

export default RegionPopup;
