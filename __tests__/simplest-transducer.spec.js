import {identityTransducerTransformer, iterator, transduce} from '../simplest-transducer';

describe(`simplest transducer with transform fn's, used as transducers, applied to transduce()`, () => {
  describe(`applied to a mapping fn as a transducer, using [].concat()`, () => {
    describe(`and using a sum() fn as a transformer fn `, () => {
      it(`should xform / xduce down to an array with double the values`, () => {
        const initialValue = [];
        const arr = [0, 1, 2, 3, 4]
        const map = fn => init => xs => xs.reduce((acc, item) => acc.concat(fn(item)), init); // the iterator?
        const xduce = xf => reducer => init => xs =>
          reducer(xf)(init)(xs);
        const sum = x => x + x; // the transformer?  ...I'm confused still
        const xs = xduce(sum)(map)(initialValue)(arr);
        expect(xs).toEqual([
          0,
          2,
          4,
          6,
          8
        ])
      });
    })
  });
  describe(`using an identity fn as transducer / transformer`, () => {
    describe(`and using [].concat() as a mapper / iterator fn `, () => {
      it(`should xform down to an array with the identical contents`, () => {
        const initialValue = [];
        const arr = [0, 1, 2, 3, 4]
        const xs = transduce(identityTransducerTransformer)(iterator)(initialValue, arr);
        expect(xs).toEqual(arr)
      });
    });
  });
});

