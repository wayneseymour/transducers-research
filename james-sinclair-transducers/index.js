const victorianSlang = [
  {
    term: 'doing the bear',
    found: true,
    popularity: 108,
  },
  {
    term: 'katterzem',
    found: false,
    popularity: null,
  },
  {
    term: 'bone shaker',
    found: true,
    popularity: 609,
  },
  {
    term: 'smothering a parrot',
    found: false,
    popularity: null,
  },
  {
    term: 'damfino',
    found: true,
    popularity: 232,
  },
  {
    term: 'rain napper',
    found: false,
    popularity: null,
  },
  {
    term: 'donkey’s breakfast',
    found: true,
    popularity: 787,
  },
  {
    term: 'rational costume',
    found: true,
    popularity: 513,
  },
  {
    term: 'mind the grease',
    found: true,
    popularity: 154,
  },
];

// Helper functions
// ---------------------------------------------------------------------------------
function isFound(item) {
  return item.found;
};

function getPopularity(item) {
  return item.popularity;
}

// We use an object to keep track of multiple values in a single return value.
function addScores({totalPopularity, itemCount}, popularity) {
  return {
    totalPopularity: totalPopularity + popularity,
    itemCount: itemCount + 1,
  };
}

// Make a function that takes a reducer and returns a
// new reducer that filters out some items so that the
// original reducer never sees them.
function makeFilterTransducer(predicate) {
  return nextReducer => (acc, item) => predicate(item) ? nextReducer(acc, item) : acc;
}

// Make a function that takes a reducer and returns a new
// reducer that transforms every time before the original
// reducer gets to see it.
function makeMapTransducer(map) {
  return nextReducer => (acc, item) => nextReducer(acc, map(item));
}

const foundFilterTransducer = makeFilterTransducer(isFound);
const scoreMappingTransducer = makeMapTransducer(getPopularity);

const allInOneReducer = foundFilterTransducer(scoreMappingTransducer(addScores));

const initialInfo = {totalPopularity: 0, itemCount: 0};
const popularityInfo = victorianSlang.reduce(allInOneReducer, initialInfo);

// Calculate the average and display.
const {totalPopularity, itemCount} = popularityInfo;
const averagePopularity = totalPopularity / itemCount;
console.log("Average popularity:", averagePopularity);
