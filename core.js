// constructor
function DecisionObject(o) {
  const cats = Object.keys(o);
  this.cats = cats;

  // access values by number of n of category.
  const entries = (n) => o[cats[n]];
  this.entries = entries;

  this.dimX = Object.keys(o).length;
  // the largest number of values assigned to any key cat of object o.
  this.dimY = Math.max(...cats.map((k) => o[k].length));
}

export default DecisionObject;
