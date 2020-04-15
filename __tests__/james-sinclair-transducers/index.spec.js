
import {makeFilterTransducer, makeMapTransducer, addScores, getPopularity, isFound} from '../../james-sinclair-transducers';



describe(`james-sinclair-transducers`, () => {

  const foundFilterTransducer = makeFilterTransducer(isFound);
  const scoreMappingTransducer = makeMapTransducer(getPopularity);

  const allInOneReducer = foundFilterTransducer(scoreMappingTransducer(addScores));

  const initialInfo = {totalPopularity: 0, itemCount: 0};

  it(`should transduce down to 400.5`, () => {
    const popularityInfo = victorianSlang().reduce(allInOneReducer, initialInfo);
    const {totalPopularity, itemCount} = popularityInfo;
    const averagePopularity = totalPopularity / itemCount;
    expect(400.5).toEqual(averagePopularity);
  });
});

function victorianSlang() {
 return [
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
 ]
};
