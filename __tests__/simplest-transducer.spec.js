import {identityTransducerTransformer, iterator, transduce} from '../simplest-transducer';

describe(`simplest transducer`, () => {
  describe(`using an identity fn as transducer / transformer`, () => {
    describe(`and using [].concat() as a mapper / iterator fn `, () => {
      it(`should xform down to an array with the identical contents`, () => {
        const initialValue = [];
        const arr = [0, 1, 2, 3, 4]
        const xs = transduce(identityTransducerTransformer)(iterator)(initialValue, arr); // [1,2,3,4,5]
        expect(xs).toEqual(arr)
      });
    });
  });
});

