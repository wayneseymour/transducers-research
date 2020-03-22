import {reduceWithReducer} from '../reduceLongForm'


describe(`long form reducer / transducer`, () => {

  const joinedWith = separator =>
    (acc, val) => (acc === '' ? val : `${acc}${separator}${val}`);

  describe(`passing the dash character to 'joinedWith' (fn / operator)`, () => {
    it(`should reduce ['t', 'r', 'e'] to 't-r-e'`, () => {
      const dashXform = reduceWithReducer(joinedWith('-'))
      const dashSeeded = dashXform('')
      expect(dashSeeded(['t', 'r', 'e'])).toEqual('t-r-e')
    });
  });
});


