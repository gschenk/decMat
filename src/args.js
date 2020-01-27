import tools from './tools.js';

const { zipWith, pureSwitch, matchSwitch } = tools;
// check command line arguments
// This function has SIDE EFFECTS (exit with error)!
// returns an object with two keys, stdin and file

// object with f to check validity of cli arguments


// dictionary of accepted argument patterns
const knownCliArguments = {
  '.yaml': 'file',
  '.yml': 'file',
  '-': 'stdin',
};

const validity = {
  tests: (maxArgs, knownArgsObject) => {
    const bla = {
      // notTooMany :: [String] -> Boolean
      notTooMany: ((n) => (as) => as.length <= n)(maxArgs),

      // knownArguments :: [String] -> Boolean
      knownArguments: ((o) => (as) => {
        const fun = matchSwitch(o)(false)((a) => (b) => a.endsWith(b));
        return as.map((a) => fun(a) !== false).every((a) => a);
      })(knownArgsObject),
    };
    return bla;
  },
  errorCases: {
    notTooMany: { err: 7 }, // E2BIG
    knownArguments: { err: 22 }, // EINVAL
  },
};


// makeBadReturn :: [s] -> [a] -> { s: a }
const makeBadReturn = (validKeys, validResults, errCases) => () => {
  const failedKeys = zipWith((a, b) => (!a ? b : ''))(validResults)(validKeys).filter((a) => a);
  const defaultErr = { err: 1 }; // EPERM

  // returns only the first failed error, TODO extend list
  return pureSwitch(errCases)(defaultErr)(failedKeys[0]);
};


// makeGoodReturn ::
const makeGoodReturn = (knownArgs, cases) => (args) => {
  const defaultCase = { };
  const argMatch = args.map(
    matchSwitch(knownArgs)('')((a) => (b) => a.endsWith(b)), // (argument);
  );
  const argMatch2 = argMatch[0] ? argMatch[0] : ''; // TODO placeholder til multiple args

  // only works with one argument
  return pureSwitch(cases(args[0]))(defaultCase)(argMatch2);
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

  // apply all tests in validityTests object on args
  const tests = validity.tests(1, knownCliArguments);
  const testsKeys = Object.keys(tests);
  const testsResults = testsKeys.map((a) => tests[a](args));

  const badReturn = makeBadReturn(testsKeys, testsResults, validity.errorCases);

  const goodCases = (arg) => ({
    stdin: { stdin: true, file: '' },
    file: { stdin: false, file: arg },
  });
  const goodReturn = makeGoodReturn(knownCliArguments, goodCases);

  const preResults = testsResults.every((a) => a)
    ? goodReturn(args)
    : badReturn(args);
  console.log('preResults ', preResults);

  return consolidateReturn(preResults, defaultResults);
}

export default { check };
