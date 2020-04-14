describe(`map reduction using [].reduce()`, () => {
  const foldMap = transitions => map => Array.from(map.entries()).reduce((map, [user, locations]) => {
    map.set(user, transitions(locations));
    return map;
  }, new Map());

  describe(`passing a map to [].from() and then reducing from map.entries()`, () => {
    describe(`using my naive foldMap fn`, () => {
      it(`should allow me to declare the current map "index"'s key and value as an array literal`, () => {
        const locationsByUser =
          [
            ["1a2ddc2", [
              "5f2b932",
              "bd11537",
              "5890595",
              "5f2b932",
              "bd11537",
              "5890595"
            ]], [
            "3abe124", [
              "bd11537",
              "5f2b932"
            ]],
            ["f1a543f", [
              "5890595",
              "5f2b932",
              "bd11537",
              "5890595",
              "5f2b932",
              "bd11537",
              "5890595"
            ]
            ]
          ]

        const slicesOf = (sliceSize, array) =>
          Array(array.length - sliceSize + 1).fill().map((_, i) => array.slice(i, i + sliceSize));

        const transitions = list => slicesOf(2, list);

        // const transitionsByUser = Array.from(locationsByUser.entries()).reduce(
        //   (map, [user, listOfLocations]) => {
        //     map.set(user, transitions(listOfLocations));
        //     return map;
        //   }, new Map());

        const transitionsByUser = foldMap(transitions)(locationsByUser)
        const expected = `    Map {
        0 => [ [ '1a2ddc2', [Array] ] ],
        1 => [ [ '3abe124', [Array] ] ],
        2 => [ [ 'f1a543f', [Array] ] ] }`
        console.dir(transitionsByUser)
        expect(console.dir(transitionsByUser)).toEqual(console.log(expected));

      });
    });
  });
});


