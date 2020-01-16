// constructor
function DecisionObject(o) {
  const cats = Object.keys(o);
  this.cats = cats;

  // access values by number of n of category.
  this.valsByColumn = (m) => o[cats[m]];
  this.valsByRow = (n) => cats.map((m) => (o[m])[n]);

  this.dimX = Object.keys(o).length;
  // the largest number of values assigned to any key cat of object o.
  this.dimY = Math.max(...cats.map((k) => o[k].length));
}

export default DecisionObject;
