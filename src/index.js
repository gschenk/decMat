import http from 'http';
import data from './data.js';
import Core from './core.js';
import Grid from './grid.js';
import Config from './config.js';
import tools from './tools.js';
import defaults from './defaults.js';
import input from './input.js';

const config = new Config(
  process.argv,
  defaults.defaultCfg,
  defaults.knownCliArguments,
  defaults.configForArg,
);
Object.freeze(config);


if (config.err !== 0) {
  const errCodes = {
    7: 'E2BIG too many arguments',
    22: 'EINVAL unknown argument',
  };
  console.error(
    tools.pureSwitch(errCodes)(`unknown error ${config.err}`)(`${config.err}`),
  );
  process.exit(config.err);
}

if (config.help) {
  console.log('This programme accepts up to two comand line arguments from the following set:');
  console.log(defaults.knownCliArguments);
  process.exit(0);
  console.log('where .yaml and .yml denote any input file, including path, with that end.');
}

// define yaml input file, STDIN has precedence over files
const inFilePath = config.stdin ? 0 : config.file;
if (config.verbose) console.log(`Input file: ${config.stdin ? 'STDIN' : inFilePath}`);

// create object with data from yaml input and methods
const doc = new Core(input.comprehend(data.readYaml(inFilePath)));

if (config.verbose) {
  console.log(
    `${doc.dimM}x${doc.dimN} matrix with categories:`,
    doc.cats,
    'and content',
    doc.grid,
  );
}

// create object with methods to format css grid
const grid = new Grid(doc.dimM, doc.dimN, true);

// put content strings together
const outputString = `<style>${grid.style}</style>
${grid.content(doc.grid)}`;

// start server and output html

// creating a server with one page
function makeView(str) {
  console.log('starting server');
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(str);
    res.end();
  }).listen(8080);
}

if (config.server) {
  makeView(outputString);
} else {
  if (config.verbose) console.log('Writing Decision Matrix as HTML to STDOUT:');
  // write rudimentary html to STDOUT
  console.log(outputString);
}
