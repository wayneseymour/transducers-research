const reduceWith = (reducer, seed, iterable) => {
    let accumulation = seed;

    for (const value of iterable) {
        accumulation = reducer(accumulation, value);
    }

    return accumulation;
};

const reduce = reducer => seed => iterable => {
    let accumulation = seed;

    for (const value of iterable) {
        accumulation = reducer(accumulation, value);
    }

    return accumulation;
};

const joinedWith = separator => (acc, val) => (acc === '' ? val : `${acc}${separator}${val}`);

const dotted = reduceWith(joinedWith('.'), '', [1, 2, 3]);
//=> "1.2.3"
console.log(`\n### dotted: \n\t${dotted}`);

// reduce([1, 2, 3], (acc, val) => acc.concat([val]), []);
// //=> [1, 2, 3]
//
// // becomes:
//
// reduceWith((acc, val) => acc.concat([val]), [], [1, 2, 3]);
