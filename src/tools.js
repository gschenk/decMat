const tools = {
// this is a convenient replacement for switch
  pureSwitch: (cases) => (defCase) => (key) => {
    const hasProperty = (o) => (s) => Object.prototype.hasOwnProperty.call(o, s);
    return hasProperty(cases)(key) ? cases[key] : defCase;
  },

  // test if a test function returns True for a value and then return a result string
  // takes an array of objects with 'test' and 'result' keys.
  // funSwitch :: Bool b, String c => a -> [{ (a -> b), c }] -> [c]
  funSwitch: (val) => (obs) => obs.map(({ test, result }) => (test(val) ? result : '')).filter((a) => (a)),
};

export default tools;
