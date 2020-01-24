import tools from './tools.js';

const { zipWith, pureSwitch, matchSwitch } = tools;
// check command line arguments
// This function has SIDE EFFECTS (exit with error)!
// returns an object with two keys, stdin and file

// object with f to check validity of cli arguments

// dictionary of accepted argument patterns
const knownArgs = {
  '.yaml': 'file',
  '.yml': 'file',
  '-': 'stdin',
};

const maxNArgs = 1;

const validTest = {
  // notTooMany :: [String] -> Boolean
  notTooMany: ((n = maxNArgs) => (as) => as.length <= n)(),

  // knownArgs :: [String] -> Boolean
  knownArgs: (as) => {
    const fun = matchSwitch(knownArgs)(false)((a) => (b) => a.endsWith(b));
    return as.map((a) => fun(a) !== false).every((a) => a);
  },
};

function check(fullArgs) {
  const args = fullArgs.slice(2);
  Object.freeze(args);

  // apply all tests in validTest object on args
  const validKeys = Object.keys(validTest);
  const validResults = validKeys.map((a) => validTest[a](args));

  const makeBadReturn = () => {
    const failedKeys = zipWith((a, b) => (!a ? b : ''))(validResults)(validKeys).filter((a) => a);
    const defaultErr = { err: 1, stdin: false, file: '' }; // EPERM
    const errCases = {
      notTooMany: { err: 7, stdin: false, file: '' }, // E2BIG
      knownArgs: { err: 22, stdin: false, file: '' }, // EINVAL
    };

    // returns only the first failed error, TODO extend list
    return pureSwitch(errCases)(defaultErr)(failedKeys[0]);
  };

  const makeGoodReturn = (argument) => {
    const defaultCase = { err: 0, stdin: false, file: '' };
    const cases = {
      stdin: { err: 0, stdin: true, file: '' },
      file: { err: 0, stdin: false, file: argument },
    };
    const argMatch = matchSwitch(knownArgs)('')((a) => (b) => a.endsWith(b))(argument);

    // only works with one argument
    return pureSwitch(cases)(defaultCase)(argMatch);
  };

  return validResults.every((a) => a)
    ? makeGoodReturn(args[0])
    : makeBadReturn(args[0]);
}

export default { check };
