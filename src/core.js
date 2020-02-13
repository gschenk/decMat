// constructor, takes object data as argument
//    data object contains decision matrix data and structure
//    where each key is a category of the decision matrix
//    and has an array of values
function DecisionMatrixO(data) {
  const cats = Object.keys(data);

  // dimM is the largest number of values assigned to any key cat of object o.
  const dimN = cats.length;

  // function to get max number of entries per column
  // dimM :: Object => Integer
  const dimM = (o) => Math.max(...cats.map((k) => o[k].length));

  // array [0..i-1]
  // zeroToI :: Integer -> [Integer]
  const zeroToI = (i) => [...Array(i).keys()];

  // access values by number of n of category.
  // valsByColumn :: Object -> Integer -> [String]
  const valsByColumn = (o) => (m) => o[cats[m]].map((a) => Object.values(a));

  // returns matching y-category key array to valsByColumn
  // yCatsByColumn :: Object -> Integer -> [String]
  const yCatsByColumn = (o) => (m) => o[cats[m]]
    .map((a) => Object.keys(a))
    .map((a) => parseInt(a, 10));

  // return all y-categories (second level keys) of all columns, unique only
  // ordered by the rank of the first occurence of each unique value
  // yCats :: Object ->
  const yCats = (o) => cats.map((k) => o[k]
    .map((p) => Object.keys(p)))
    .flat()
    .flat()
    .filter((a, i, as) => as.indexOf(a) === i)
    .map((a) => parseInt(a, 10));

  // properties and methods
  // this.cats :: [String]
  this.cats = cats;

  // this.yCats :: [String]
  this.yCats = yCats(data);

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
