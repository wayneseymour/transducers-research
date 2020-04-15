export const identityTransducerTransformer = x => x; /// controls how the data is transformed
export const iterator = (acc, val) => acc.concat(val) // controls the iteration
export const transduce = xf => nextReducer => (acc, item) =>
    nextReducer(acc, xf(item))
