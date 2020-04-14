const logContents = `1a2ddc2, 5f2b932
f1a543f, 5890595
3abe124, bd11537
f1a543f, 5f2b932
f1a543f, bd11537
f1a543f, 5890595
1a2ddc2, bd11537
1a2ddc2, 5890595
3abe124, 5f2b932
f1a543f, 5f2b932
f1a543f, bd11537
f1a543f, 5890595
1a2ddc2, 5f2b932
1a2ddc2, bd11537
1a2ddc2, 5890595`;

const lines = str => str.split('\n');
const logLines = lines(logContents);

const datums = str => str.split(', ');
const datumize = arr => arr.map(datums);

const data = datumize(logLines);

//=>
// [["1a2ddc2", "5f2b932"]
//   ["f1a543f", "5890595"]
//   ["3abe124", "bd11537"]
//   ["f1a543f", "5f2b932"]
//   ["f1a543f", "bd11537"]
//   ["f1a543f", "5890595"]
//   ["1a2ddc2", "bd11537"]
//   ["1a2ddc2", "5890595"]
//   ["3abe124", "5f2b932"]
//   ["f1a543f", "5f2b932"]
//   ["f1a543f", "bd11537"]
//   ["f1a543f", "5890595"]
//   ["1a2ddc2", "5f2b932"]
//   ["1a2ddc2", "bd11537"]
//   ["1a2ddc2", "5890595"]]
const listize = arr => arr.reduce(
  (map, [user, location]) => {
    if (map.has(user)) {
      map.get(user).push(location);
    } else {
      map.set(user, [location]);
    }
    return map;
  }, new Map());

const locationsByUser = listize(data);

console.dir(locationsByUser)
//=>
// Map{
//   "1a2ddc2": [
//     "5f2b932",
//     "bd11537",
//     "5890595",
//     "5f2b932",
//     "bd11537",
//     "5890595"
//   ],
//     "3abe124": [
//     "bd11537",
//     "5f2b932"
//   ],
//     "f1a543f": [
//     "5890595",
//     "5f2b932",
//     "bd11537",
//     "5890595",
//     "5f2b932",
//     "bd11537",
//     "5890595"
//   ]
// }
const slicesOf = (sliceSize, array) =>
  Array(array.length - sliceSize + 1).fill().map((_,i) => array.slice(i, i+sliceSize));

const transitions = list => slicesOf(2, list);

const transitionsByUser = Array.from(locationsByUser.entries()).reduce(
  (map, [user, listOfLocations]) => {
    map.set(user, transitions(listOfLocations));
    return map;
  }, new Map());
console.dir(transitionsByUser)
//=>
// Map{
//   "1a2ddc2": [
//     ["5f2b932", "bd11537"],
//     ["bd11537", "5890595"],
//     ["5890595", "5f2b932"],
//     ["5f2b932", "bd11537"],
//     ["bd11537", "5890595"]
//   ],
//     "f1a543f": [
//     ["5890595", "5f2b932"],
//     ["5f2b932", "bd11537"],
//     ["bd11537", "5890595"],
//     ["5890595", "5f2b932"],
//     ["5f2b932", "bd11537"],
//     ["bd11537", "5890595"]
//   ],
//     "3abe124": [
//     ["bd11537", "5f2b932"]
//   ]
// }
