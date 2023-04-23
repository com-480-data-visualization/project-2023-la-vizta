import { Popup } from "react-leaflet";
import { Region, Track, GenreName, Color } from "~/types";
import StreamChart from "./StreamChart";
import { paletteGenre } from "~/constants";

// <img width={200} height={200} src='https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/f1/b8/default-avatar-2020-22.jpg'></img>

// const rankColors = [
//     '#CBAA18',
//     '#A2A19D',
//     '#CC7E18',
//     '#3E9A9D',
//     '#3E9A9D'
// ]
const data = [
  { year: 1980, efficiency: 24.3, sales: 8949000 },
  { year: 1985, efficiency: 27.6, sales: 10979000 },
  { year: 1990, efficiency: 28, sales: 9303000 },
  { year: 1991, efficiency: 28.4, sales: 8185000 },
  { year: 1992, efficiency: 27.9, sales: 8213000 },
  { year: 1993, efficiency: 28.4, sales: 8518000 },
  { year: 1994, efficiency: 28.3, sales: 8991000 },
  { year: 1995, efficiency: 28.6, sales: 8620000 },
  { year: 1996, efficiency: 28.5, sales: 8479000 },
  { year: 1997, efficiency: 28.7, sales: 8217000 },
  { year: 1998, efficiency: 28.8, sales: 8085000 },
  { year: 1999, efficiency: 28.3, sales: 8638000 },
  { year: 2000, efficiency: 28.5, sales: 8778000 },
  { year: 2001, efficiency: 28.8, sales: 8352000 },
  { year: 2002, efficiency: 29, sales: 8042000 },
  { year: 2003, efficiency: 29.5, sales: 7556000 },
  { year: 2004, efficiency: 29.5, sales: 7483000 },
  { year: 2005, efficiency: 30.3, sales: 7660000 },
  { year: 2006, efficiency: 30.1, sales: 7762000 },
  { year: 2007, efficiency: 31.2, sales: 7562000 },
  { year: 2008, efficiency: 31.5, sales: 6769000 },
  { year: 2009, efficiency: 32.9, sales: 5402000 },
  { year: 2010, efficiency: 33.9, sales: 5636000 },
  { year: 2011, efficiency: 33.1, sales: 6093000 },
  { year: 2012, efficiency: 35.3, sales: 7245000 },
  { year: 2013, efficiency: 36.4, sales: 7586000 },
  { year: 2014, efficiency: 36.5, sales: 7708000 },
  { year: 2015, efficiency: 37.2, sales: 7517000 },
  { year: 2016, efficiency: 37.7, sales: 6873000 },
  { year: 2017, efficiency: 39.4, sales: 6081000 },
];

const rankColors = ["#FF9D00", "#FF5400", "#B01A2E", "#9A9A9A", "#9A9A9A"];

const fontGenres = ["xx-large", "x-large", "large", "small", "small"];

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

const CTrack = ({ i, track }: { i: number; track: Track }) => {
  return (
    <div className="">
      <h4 className="text-lg font-semibold whitespace-nowrap text-ellipsis font-Azeret mb-[-5px] mt-1">
        <span>{i}.</span> {track.title}
      </h4>
      <p className="font-Quicksand whitespace-nowrap text-ellipsis">
        {track.artist}
      </p>
    </div>
  );
};

const TEST_TEMPERATURES = [13, 18, 21, 19, 26, 25, 16];
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CChart = () => {
  return <StreamChart data={data} />;
};

const CGenre = ({ i, genre, color }: ICGenre) => {
  const font = fontGenres[i - 1];
  return (
    <p
      className="whitespace-nowrap font-Quicksand"
      style={{ color: color, fontSize: font }}
    >
      {genre}
    </p>
  );
};

const RegionPopup = ({
  region,
  topGenres,
  tracks,
}: IRegionPopup) => {
  const a = topGenres[0];
  console.log(topGenres[0]);

  console.log(typeof a);
  console.log(paletteGenre[a]);
  return (
    <Popup>
      <div>
        <div className="m-auto max-w-min whitespace-nowrap font-Playfair text-2xl">
          {region}
        </div>
        <div className="m-auto w-14 border-t-2 border-black mt-1 mb-3"></div>
        <div className="flex gap-10 text-base font-Jetbrains">
          <div className="">
            {topGenres.map((genre: GenreName, j) => (
              <CGenre
                key={`genre-${j}`}
                i={j + 1}
                genre={genre}
                color={paletteGenre[genre] || "white"}
              />
            ))}
          </div>
          <div className="">
            {tracks.map((track, j) => (
              <CTrack key={`track-${j}`} i={j + 1} track={track} />
            ))}
          </div>
        </div>
        <CChart />
      </div>
    </Popup>
  );
};

export default RegionPopup;
