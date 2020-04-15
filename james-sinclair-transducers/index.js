export const victorianSlang = [
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
export function isFound(item) {
  return item.found;
};

export const getPopularity = item =>
  item.popularity;

// We use an object to keep track of multiple values in a single return value.
export const addScores = ({totalPopularity, itemCount}, popularity) => ({
  totalPopularity: totalPopularity + popularity,
  itemCount: itemCount + 1,
});

// Make a function that takes a reducer and returns a
// new reducer that filters out some items so that the
// original reducer never sees them.
export const makeFilterTransducer = predicate => nextReducer => (acc, item) =>
  predicate(item) ? nextReducer(acc, item) : acc;

// Make a function that takes a reducer and returns a new
// reducer that transforms every time before the original
// reducer gets to see it.
export const makeMapTransducer = mapper => nextReducer => (acc, item) =>
  nextReducer(acc, mapper(item));

// export function makeMapTransducer(mapper) {
//   return nextReducer => {
//     return (acc, item) => {
//       return nextReducer(acc, mapper(item));
//     }
//   }
// }
