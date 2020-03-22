export function reduceWithReducer(reducer) {
  return function reduceWithSeed(seed) {
    return function reduceWithIterable(iterable) {
      let accumulation = seed;

      for (const value of iterable) {
        accumulation = reducer(accumulation, value);
      }

      return accumulation;
    }
  }
}





//
// function reduce(reducer) {
//     return function reduceSeed(seed) {
//         return function reduceIterable(iterable) {
//             let accumulation = seed;
//
//             for (const value of iterable) {
//                 accumulation = reducer(accumulation, value);
//             }
//
//             return accumulation;
//         }
//     }
// }

// const dotted = reduceWithReducer(joinedWith('.'))('')([1, 2, 3]);
// //=> "1.2.3"
// console.log(`\n### dotted: \n\t${dotted}`);
//
// const normalReduce = reduce((acc, val) => acc.concat([val]))([1, 2, 3])([]);
// console.log(`\n### normalReduce: \n\t${normalReduce}`);
// //=> [1, 2, 3]
//
// // becomes:
//
// const reducedWithReduce = reduceWithReducer((acc, val) => acc.concat([val]))([])([1, 2, 3]);
// console.log(`\n### reducedWithReduce: \n\t${reducedWithReduce}`);
// //=> [1, 2, 3]
