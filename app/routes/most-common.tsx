import { LoaderFunction, useLoaderData } from 'remix';
import { listOfChars } from '~/utils/characters';
import { allowed, allWords, wins } from '~/utils/words';

type placePos = 'pos1' | 'pos2' | 'pos3' | 'pos4' | 'pos5';

type CharType = {
  [key: string]: {
    totalTimes: number;
    places: Record<placePos, number>;
  };
};

type CharReturnType = {
  totalTimes: number;
  places: Record<placePos, number>;
  char: string;
}[];

type LoaderReturnType = {
  wins: CharReturnType;
  allowed: CharReturnType;
  all: CharReturnType;
};

const emptyDefaultChar = {
  totalTimes: 0,
  places: {
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
    pos5: 0,
  },
};

export const loader: LoaderFunction = (): LoaderReturnType => {
  const emptyResult: CharType = Object.fromEntries(listOfChars.map((char) => [char, emptyDefaultChar]));

  const getMostCommonChars = (words: string[]) => {
    const chars = words.reduce((acc: CharType, word) => {
      word.split('').forEach((char, index) => {
        const pos = `pos${index + 1}` as placePos;
        acc[char] = {
          ...acc[char],
          totalTimes: acc[char].totalTimes + 1,
          places: {
            ...acc[char].places,
            [pos]: acc[char].places[pos] + 1,
          },
        };
      });
      return acc;
    }, emptyResult);
    const sortedChars = Object.entries(chars)
      .map(([key, value]) => ({ char: key, ...value }))
      .sort((a, b) => b.totalTimes - a.totalTimes);
    return sortedChars;
  };

  return {
    wins: getMostCommonChars(wins),
    allowed: getMostCommonChars(allowed),
    all: getMostCommonChars(allWords),
  };
};

export default function MostCommon() {
  const { wins, allowed, all } = useLoaderData<LoaderReturnType>();

  return (
    <div>
      <h1>Most Common</h1>
      <h2>Wins</h2>
      <ul>
        {wins.map(({ char, totalTimes, places }) => (
          <li key={char}>
            {char} ({totalTimes}): {Object.entries(places).map(([key, value]) => `${key}: ${value}`)}
          </li>
        ))}
      </ul>
      <h2>Allowed</h2>
      <ul>
        {allowed.map(({ char, totalTimes, places }) => (
          <li key={char}>
            {char} ({totalTimes}): {Object.entries(places).map(([key, value]) => `${key}: ${value}`)}
          </li>
        ))}
      </ul>
      <h2>All</h2>
      <ul>
        {all.map(({ char, totalTimes, places }) => (
          <li key={char}>
            {char} ({totalTimes}): {Object.entries(places).map(([key, value]) => `${key}: ${value}`)}
          </li>
        ))}
      </ul>
    </div>
  );
}
