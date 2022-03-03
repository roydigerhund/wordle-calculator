import { wins, allowed } from "./words";

type placePos = "pos1" | "pos2" | "pos3" | "pos4" | "pos5";

type ReturnType = {
  [key: string]: {
    totalTimes: number;
    places: Record<placePos, number>;
  };
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

const listOfChars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const emptyResult: ReturnType = Object.fromEntries(
  listOfChars.map((char) => [char, emptyDefaultChar])
);

const getMostCommonChars = (words: string[]) => {
  const chars = words.reduce((acc: ReturnType, word) => {
    word.split("").forEach((char, index) => {
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

console.log('WINNER WORDS:', getMostCommonChars(wins));
console.log('ALLOWED WORDS:', getMostCommonChars(allowed));
