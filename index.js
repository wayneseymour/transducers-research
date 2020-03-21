// interface Reducer<A, B> extends Array<any> {
//     /**
//      * Initialization, e.g. to provide a suitable initial
//      * accumulator value, only called when no initial result
//      * has been provided by the user.
//      */
//     [0]: () => A,
//     /**
//      * Completion. When called usually just returns `acc`,
//      * but stateful transformers should flush/apply their
//      * outstanding results.
//      */
//     [1]: (acc: A) => A,
//     /**
//      * Reduction step. Combines new input with accumulator.
//      * If reduction should terminate early, wrap result via
//      * `reduced()`
//      */
//     [2]: (acc: A, x: B) => A | Reduced<A>,
// }

const sum = () => [
    () => 0,
    (acc) => acc,
    (acc, x) => acc + x
];
const push = () => [
    () => [],
    (acc) => acc,
    (acc, x) => (acc.push(x), acc)
];
const histogram = () => [
    () => ({}),
    (acc) => acc,
    (acc, x) => ((acc[x] ? acc[x]++ : (acc[x]=1)), acc)
];

const reduce = (reducer, initial, xs) => {
    // use reducer's default init if not user provided
    let acc = initial != null ? initial : reducer[0]();
    // reduce all inputs
    for(let x of xs) {
        acc = reducer[2](acc, x);
    }
    // call completion fn to post-process final result
    return reducer[1](acc);
}
// then use like:
// no initial result provided, so use reducer default init
reduce(sum(), null, [1,2,3,4])
// 10
// with initial result of 100
reduce(sum(), 100, [1,2,3,4])
// 110
// reduction of a ES6 Set
reduce(sum(), 0, new Set([1,2,2,1,1,3,4,3,2]))
// 10
// strings are iterable too
console.log(reduce(histogram(), null, "reducers"))
// { r: 2, e: 2, d: 1, u: 1, c: 1, s: 1 }

// or without types

// composes transducer `xform` with reducer `rfn`
// then calls reduce
const transduce = (xform, rfn, initial, xs) =>
    reduce(xform(rfn), initial, xs);
const map = (f) => (r) => [r[0], r[1], (acc, x) => r[2](acc, f(x))];

// Some basic examples, both using the same transducer, but different reducers:
// pre-build a times 10 standalone transducer for re-use

const mul10 = map((x) => x * 10)
// Replicate Array.map()
transduce(mul10, push(), null, [1, 2, 3, 4])
    [ 10, 20, 30, 40 ]
// or sum up values
console.log(transduce(mul10, sum(), null, [1, 2, 3, 4]))
// 100
