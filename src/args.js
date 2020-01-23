import tools from './tools.js';
const { funSwitch } = tools;
// check command line arguments
// This function has SIDE EFFECTS (exit with error)!
// returns an object with two keys, stdin and file

// object with f to check validity of cli arguments

// dictionary of accepted argument patterns
const knownArgs = {
  stdin: (s) => s === '-',
  inYaml: (s) => s.endsWith('.yaml'),
  inYml: (s) => s.endsWith('.yml'),
};

const valid = {
  // tooLong :: Integer -> [String] -> Boolean
  tooLong: (n) => (a) => a.length > n,

  // notKnown :: { (String -> Bool) } -> String -> Bool
  notKnown: (o) => (s) => {
    const fs = Object.keys(o).map((t) => o[t]);
    return !fs.some((f) => f(s));
  },
};

function newCheck() {
  // const { argv } = process;

  const args = process.argv.slice(2);
  // const [head, second, ...args] = process.argv;
  Object.freeze(args);

  const error = funSwitch(args)([
    { test: valid.tooLong(1), result: 'too many arguments' },
    { test: (a) => a.some(valid.notKnown(knownArgs)), result: 'unknown cli argument' },
  ]);
  return error;

  // stdin: (s) => s === '-',
  // inYaml: (s) => s.endsWith('.yaml'),
}
console.log(newCheck());

function check() {
  const { argv } = process;
  Object.freeze(argv);

  // usually the first and second element of argv contains the path to node's binary
  // and the path to the source file. I do not take precautions for when it is not so.

  // if there are only two argv elements, its node bin and source file, do nothing
  if (!valid.tooLong(2)(argv)) return { stdin: false, file: '' };

  // E2BIG Argument list too long
  if (valid.tooLong(3)(argv)) {
    console.error(`Argument list too long. ${argv[1]} accepts only one argument`);
    process.exit(7);
  }

  // '-' toggles stdin
  if (argv[2] === '-') return { stdin: true, file: '' };

  //
  if (argv[2].endsWith('.yaml')) return { stdin: false, file: argv[2] };

  // EINVAL 22 Invalid argument
  if (!valid.notKnown(knownArgs)(argv[2])) {
    console.log(`The node script ${argv[1]} accepts a single command line argument.
  It is either '-' for STDIN or the path to a *.yaml file. If no argument is provided
  The example will be shown as output.`);
    console.error('Cannot comprehend argument.')
    process.exit(22);
  }
  return {};
}

export default { check };
