// constructor, takes object data as argument
//    data object contains decision matrix data and structure
//    where each key is a category of the decision matrix
//    and has an array of values
function DecisionMatrixO(data) {
  const cats = Object.keys(data);

  // M rows
  // dimM is the largest number of values assigned to any key cat of object o.
  const dimN = cats.length;

  // N columns
  // function to get max number of entries per column
  // dimM :: Object => Integer
  const dimM = (o) => Math.max(...cats.map((k) => o[k].length));

  // array [0..i-1]
  // zeroToI :: Integer -> [Integer]
  const zeroToI = (i) => [...Array(i).keys()];

  // access values by number of n of category.
  // valsByColumn :: Object -> Integer -> [String]
  const valsByColumn = (o) => (m) => o[cats[m]];

  // properties and methods
  // this.cats :: [String]
  this.cats = cats;

  // capital M, N for Integers; maths convention > JS convention
  // this.dimM :: { Integer, Integer }
  this.dim = { M: dimM(data), N: dimN };

  // this zeroToM :: [Integer]
  this.zeroToM = zeroToI(dimM);

  // this.valsByColumn :: Integer -> [String]
  this.valsByColumn = valsByColumn(data);
}

export default DecisionMatrixO;
