import tools from './tools.js';

const { zipWith, pureSwitch, matchSwitch } = tools;
// check command line arguments
// This function has SIDE EFFECTS (exit with error)!
// returns an object with two keys, stdin and file

// object with f to check validity of cli arguments

const maxNArgs = 1;

// dictionary of accepted argument patterns
const knownArgs = {
  '.yaml': 'file',
  '.yml': 'file',
  '-': 'stdin',
};

const validTest = {
  // notTooMany :: [String] -> Boolean
  notTooMany: ((n = maxNArgs) => (as) => as.length <= n)(),

  // knownArgs :: [String] -> Boolean
  knownArgs: (as) => {
    const fun = matchSwitch(knownArgs)(false)((a) => (b) => a.endsWith(b));
    return as.map((a) => fun(a) !== false).every((a) => a);
  },
};

// Takes an object that contains some keys that are
// a subset of the keys of the second argument.
// Returns an object with all keys in the first object
// with values from the first overriding the second
// consolidateReturn :: Object -> Object -> Object
const consolidateReturn = (parts, defaults) => {
  const partsKeys = Object.keys(parts);
  const defaultKeys = Object.keys(defaults);
  const keysIncluded = defaultKeys.map((a) => partsKeys.includes(a));

  // reducer :: { a } -> { b } -> { a, b }
  const reducer = (o, a) => ({ ...o, ...a });

  // zipper :: String s, Bool b => { s: a } -> { s: a } -> s -> b -> a
  const zipper = (oTrue, oFalse) => (a, b) => (b ? { [a]: oTrue[a] } : { [a]: oFalse[a] });

  return tools.zipWith(zipper(parts, defaults))(defaultKeys)(keysIncluded).reduce(reducer);
};

// args.check :: String s => [s] -> { a }
function check(fullArgs, defaultResults) {
  const args = fullArgs.slice(2);
  Object.freeze(args);

  // apply all tests in validTest object on args
  const validKeys = Object.keys(validTest);
  const validResults = validKeys.map((a) => validTest[a](args));

  const makeBadReturn = () => {
    const failedKeys = zipWith((a, b) => (!a ? b : ''))(validResults)(validKeys).filter((a) => a);
    const defaultErr = { err: 1 }; // EPERM
    const errCases = {
      notTooMany: { err: 7 }, // E2BIG
      knownArgs: { err: 22 }, // EINVAL
    };

    // returns only the first failed error, TODO extend list
    return pureSwitch(errCases)(defaultErr)(failedKeys[0]);
  };

  const makeGoodReturn = (argument) => {
    const defaultCase = { err: 0 };
    const cases = {
      stdin: { stdin: true, file: '' },
      file: { stdin: false, file: argument },
    };
    const argMatch = matchSwitch(knownArgs)('')((a) => (b) => a.endsWith(b))(argument);

    // only works with one argument
    return pureSwitch(cases)(defaultCase)(argMatch);
  };

  const preResults = validResults.every((a) => a)
    ? makeGoodReturn(args[0])
    : makeBadReturn(args[0]);

  return consolidateReturn(preResults, defaultResults);
}

export default { check };
