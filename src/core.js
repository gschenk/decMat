// categories along horizontal axis
const xCats = Object.keys;

// return all y-categories (second level keys) of all columns, unique only
// ordered by the rank of the first occurence of each unique value
// yCats :: Object -> [String]
const yCats = (o) => xCats(o).map((k) => o[k]
  .map((p) => Object.keys(p)))
  .flat()
  .flat()
  .filter((a, i, as) => as.indexOf(a) === i);

// dimM :: Object => Integer
const dimM = (o) => yCats(o).length;


const maxM = (o) => Math.max(...xCats(o).map((k) => o[k].length));


// dimM :: Object => Integer
const dimN = (o) => xCats(o).length;

// reorders data elements in a N x M+1 grid that also includes headers
const griddify = (o) => xCats(o).map((k) => [
  k,
  ...yCats(o).map((l) => o[k].reduce((qs, q) => ({ ...qs, ...q }))[l] || ''),
]);

// constructor, takes object data as argument
//    data object contains decision matrix data and structure
//    where each key is a category of the decision matrix
//    and has an array of values
class Core {
  constructor(data, headers = true) {
    // this.cats :: [String]
    this.cats = xCats(data);

    // dimN is the number of columns
    this.dimN = dimN(data) + (headers ? 1 : 0);

    // with headers grid M dimension depends on unique row heads,
    // without headers the largest column sets M
    // this.dimM:: Integer
    this.dimM = headers
      ? dimM(data) + 1
      : maxM(data);

    this.grid = headers
      ? [['', ...yCats(data)], ...griddify(data)]
      : [...griddify(data)
        .map((as) => as.slice(1).filter((a) => a))];
  }
}

// const core = new Core(test);
// console.log(core.grid, core.dimM);

export default Core;
