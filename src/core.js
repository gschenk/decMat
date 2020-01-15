// constructor, takes object data as argument
//    data object contains decision matrix data and structure
//    where each key is a category of the decision matrix
//    and has an array of values
function DecisionMatrixObjectect(data) {
  const cats = Object.keys(data);

  // dimM is the largest number of values assigned to any key cat of object o.
  const dimM = cats.length;

  // array [0..i-1]
  // zeroToI :: Integer -> [Integer]
  const zeroToI = (i) => [...Array(i).keys()];

  // access values by number of n of category.
  // valsByColumn :: Object -> Integer -> [String]
  const valsByColumn = (o) => (m) => o[cats[m]];

  // properties and methods
  // this.cats :: [String]
  this.cats = cats;

  // this.dimM :: Integer
  this.dimM = dimM;

  // this zeroToM :: [Integer]
  this.zeroToM = zeroToI(dimM);

  // this.valsByColumn :: Integer -> [String]
  this.valsByColumn = valsByColumn(data);
}

export default DecisionMatrixObjectect;
