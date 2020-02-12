// comprehends inner objects in toNestedArrays
// if second arg is object return it deconstructed
// otherwise return passed key and value
// innerComp :: String -> b -> [c]
const innerComp = (a, b) => (typeof b === 'object'
  ? Object.keys(b).map((k) => [k, b[k]]).flat()
  : [a, b]);

// Changes all three possible types of input into nested arrays of the same structure.
// toNestedArrays Object -> [[String]]
const toNestedArrays = (o) => Object.keys(o)
  .map((k) => (Object.keys(o[k]).map((l) => [k, ...innerComp(l, o[k][l])])))
  .flat();

// takes nested arrays as returned by toNestedArrays and returns nested objects
const toNestedObjects = (as) => as.reduce(
  (o, a) => ({ ...o, [a[0]]: [...(o[a[0]] || []), { [a[1]]: a[2] }] }),
  {},
);

// takes an input object of any one of the shapes
// A = { cat1: ['val a', 'val b'], cat2: ['val c', 'val d'] };
// B = { xcat1: { ycat1: 'val a', ycat2: 'val b' }, xcat2: { ycat1: 'val c', ycat2: 'val d' } };
// C = {
//   xcat1: [{ ycat1: 'val a' }, { ycat2: 'val b' }],
//   xcat2: [{ ycat1: 'val c' }, { ycat2: 'val d' }],
// };
// and returns it as nested objects of type C
const comprehend = (input) => toNestedObjects(toNestedArrays(input));

export default { comprehend };
