// constructor
function DecisionObject(o) {
  const cats = Object.keys(o);
  const dimM = cats.length;

  this.cats = cats;

  // access values by number of n of category.
  // .valsByColumn :: Integer -> Object -> [String]
  this.valsByColumn = (m) => o[cats[m]];

  // .valsByRow :: Integer -> Integer -> Object -> [String]
  this.valsByRow = (n) => cats.map((m) => (o[m])[n]);

  // the largest number of values assigned to any key cat of object o.
  this.dimM = dimM;
  this.dimN = Math.max(...cats.map((k) => o[k].length));
  this.zeroToM = [...Array(dimM).keys()];
}

export default DecisionObject;
