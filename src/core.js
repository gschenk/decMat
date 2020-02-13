// constructor, takes object data as argument
//    data object contains decision matrix data and structure
//    where each key is a category of the decision matrix
//    and has an array of values
function DecisionMatrixO(data) {
  // array [0..i-1]
  // zeroToI :: Integer -> [Integer]
  const zeroToI = (i) => [...Array(i).keys()];

  // categories along horizontal axis
  const xCats = Object.keys(data);

  // dimM is the largest number of values assigned to any key cat of object o.
  const dimN = xCats.length;

  // access values by number of n of category.
  // valsByColumn :: Object -> Integer -> [String]
  const valsByColumn = (o) => (n) => o[xCats[n]].map((a) => Object.values(a));

  // return all y-categories (second level keys) of all columns, unique only
  // ordered by the rank of the first occurence of each unique value
  // yCats :: Object ->
  const yCats = xCats.map((k) => data[k]
    .map((p) => Object.keys(p)))
    .flat()
    .flat()
    .filter((a, i, as) => as.indexOf(a) === i)
    .map((a) => parseInt(a, 10));

  // returns matching y-category key array to valsByColumn
  // yCatsByColumn :: Object -> Integer -> [String]
  const yCatsByColumn = (o) => (m) => o[xCats[m]]
    .map((a) => Object.keys(a))
    .map((a) => parseInt(a, 10));

  // function to get max number of entries per column
  // dimM :: Object => Integer
  const dimM = (o) => Math.max(...xCats.map((k) => o[k].length));

  // properties and methods
  // this.cats :: [String]
  this.cats = xCats;

  // this.yCats :: [String]
  this.yCats = yCats;

  // this.dimM :: Integer
  this.dimN = dimN;

  // this.dimM:: Integer
  this.dimM = dimM(data);

  // this zeroToM :: [Integer]
  this.zeroToN = zeroToI(dimN);

  // this.valsByColumn :: Integer -> [String]
  this.valsByColumn = valsByColumn(data);

  // this.yCatsByColumn :: Integer -> [String]
  this.yCatsByColumn = yCatsByColumn(data);
}

export default DecisionMatrixO;
