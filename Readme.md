# Wordle Calculator

This little programm will output how often and in which places characters occur in the list of wordle words.
It also provided a simple solution finder.

## Setup

`yarn`

## Run locally

`yarn dev`

## Result of Top 5 Chars

### In list of winning words

```js
const top5InWinningWords = [
  {
    char: 'e',
    totalTimes: 1230,
    places: { pos1: 72, pos2: 241, pos3: 177, pos4: 318, pos5: 422 }
  },
  {
    char: 'a',
    totalTimes: 975,
    places: { pos1: 140, pos2: 304, pos3: 306, pos4: 162, pos5: 63 }
  },
  {
    char: 'r',
    totalTimes: 897,
    places: { pos1: 105, pos2: 267, pos3: 163, pos4: 150, pos5: 212 }
  },
  {
    char: 'o',
    totalTimes: 753,
    places: { pos1: 41, pos2: 279, pos3: 243, pos4: 132, pos5: 58 }
  },
  {
    char: 't',
    totalTimes: 729,
    places: { pos1: 149, pos2: 77, pos3: 111, pos4: 139, pos5: 253 }
  },
]
```

### In list of allowed words

```js
const top5InAllowedWords = [
  {
    char: 'e',
    totalTimes: 6653,
    places: { pos1: 303, pos2: 1626, pos3: 882, pos4: 2323, pos5: 1519 }
  },
  {
    char: 's',
    totalTimes: 6649,
    places: { pos1: 1560, pos2: 93, pos3: 531, pos4: 515, pos5: 3950 }
  },
  {
    char: 'a',
    totalTimes: 5983,
    places: { pos1: 736, pos2: 2260, pos3: 1235, pos4: 1073, pos5: 679 }
  },
  {
    char: 'o',
    totalTimes: 4428,
    places: { pos1: 262, pos2: 2093, pos3: 989, pos4: 696, pos5: 388 }
  },
  {
    char: 'r',
    totalTimes: 4154,
    places: { pos1: 628, pos2: 940, pos3: 1197, pos4: 716, pos5: 673 }
  },
]
```