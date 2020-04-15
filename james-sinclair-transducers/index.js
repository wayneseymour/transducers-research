
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
