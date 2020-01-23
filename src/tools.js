// zipWith takes two arrays and applies a function element wise
// zipWith :: ( a -> b -> c ) -> [a] -> [b] -> [c]
const zipWith = (f) => (xs) => (ys) => xs.map((n, i) => f(n, ys[i]));

const tools = {
// this is a convenient replacement for switch
  // pureSwitch :: String a => { a: b } -> b -> a -> b
  pureSwitch: (cases) => (defCase) => (key) => {
    const hasProperty = (o) => (s) => Object.keys(o).includes(s);
    return hasProperty(cases)(key) ? cases[key] : defCase;
  },

  // this is a convenient replacement for switch
  // pureSwitch :: String a, Bool b => { a: c } -> c -> ( a -> a -> b ) -> a -> b
  matchSwitch: (cases) => (defCase) => (fun) => (str) => {
    // keys :: [String]
    const keys = Object.keys(cases);

    // matcher :: String a, Bool b =>  [a] -> ( a -> a -> b ) -> a -> [b]
    const matcher = (as) => (f) => (s) => as.map(f(s));

    // keyToMatch :: [String] -> [Bool] -> String;
    const keyToMatch = (as) => (bs) => zipWith((a, b) => (b ? a : ''))(as)(bs);

    // key :: String
    const key = keyToMatch(keys)(matcher(keys)(fun)(str)).filter((c) => (c)).join('');
    const uniqeMatch = matcher(keys)(fun)(str).filter((a) => (a)).length === 1;
    return uniqeMatch ? cases[key] : defCase;
  },

  // test if a test function returns True for a value and then return a result string
  // takes an array of objects with 'test' and 'result' keys.
  // funSwitch :: Bool b, String c => a -> [{ (a -> b), c }] -> [c]
  funSwitch: (val) => (obs) => obs.map(({ test, result }) => (test(val) ? result : '')).filter((a) => (a)),

  zipWith,
};

export default tools;
