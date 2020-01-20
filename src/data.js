// reads content from yaml and provides object with its contents
const yaml = require('js-yaml');
const fs = require('fs');

// const yaml = require('js-yaml');
// const fs = require('fs');

// check command line arguments
// This function has SIDE EFFECTS (exit with error)!
// returns an object with two keys, stdin and file
function checkArgv() {
  const { argv } = process;
  Object.freeze(argv);

  // usually the first and second element of argv contains the path to node's binary
  // and the path to the source file. I do not take precautions for when it is not so.

  // if there are only two argv elements, its node bin and source file, do nothing
  if (argv.length <= 2) return { stdin: false, file: '' };

  // E2BIG Argument list too long
  if (argv.length > 3) {
    console.error(`Argument list too long. ${argv[1]} accepts only one argument`);
    process.exit(7);
  }

  // '-' toggles stdin
  if (argv[2] === '-') return { stdin: true, file: '' };

  //
  if (argv[2].endsWith('.yaml')) return { stdin: false, file: argv[2] };

  // all ifs are false, continue here
  // EINVAL 22 Invalid argument
  console.log(`The node script ${argv[1]} accepts a single command line argument.
It is either '-' for STDIN or the path to a *.yaml file. If no argument is provided
The example will be shown as output.`);
  console.error('Cannot comprehend argument.')
  process.exit(22);
}

// const data = fs.readFileSync(0, "utf-8");
function readYmlData(inFilePath) {
  // mutable binding to get variable before try scope
  let YmlDoc = {};
  // safeLoad from js-yaml loads one document per yaml file
  try {
    YmlDoc = yaml.safeLoad(fs.readFileSync(inFilePath, 'utf8'));
  } catch (e) {
    console.log(e);
  }
  return YmlDoc;
}
module.exports = {
  checkArgv,
  readYmlData,
};
