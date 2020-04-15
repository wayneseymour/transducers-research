
import {victorianSlang, makeFilterTransducer, makeMapTransducer, addScores, getPopularity, isFound} from '../../james-sinclair-transducers';

describe(`james-sinclair-transducers`, () => {

  const foundFilterTransducer = makeFilterTransducer(isFound);
  const scoreMappingTransducer = makeMapTransducer(getPopularity);

  const allInOneReducer = foundFilterTransducer(scoreMappingTransducer(addScores));

  const initialInfo = {totalPopularity: 0, itemCount: 0};
  const popularityInfo = victorianSlang.reduce(allInOneReducer, initialInfo);


  it(`should transduce down to 400.5`, () => {
    const {totalPopularity, itemCount} = popularityInfo;
    const averagePopularity = totalPopularity / itemCount;
    expect(400.5).toEqual(averagePopularity);
  });
});
