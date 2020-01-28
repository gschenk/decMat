import http from 'http';
import data from './data.js';
import DecisionMatrixO from './core.js';
import Grid from './grid.js';
import Config from './config.js';
import tools from './tools.js';
import defaults from './defaults.js';

const config = Config.getConfig(
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

// define yaml input file, STDIN has precedence over files
const inFilePath = config.stdin ? 0 : config.file;
if (config.verbose) console.log(`Input file: ${config.stdin ? 'STDIN' : inFilePath}`);

// create object with data from yaml input and methods
const doc = new DecisionMatrixO(data.readYaml(inFilePath));

if (config.verbose) {
  console.log(
    `${doc.dimM}x${doc.dimN} matrix with categories:`,
    doc.cats,
    `and values ${doc.zeroToN.map(doc.valsByColumn)}.\n`,
  );
}

// create object with methods to format css grid
const grid = new Grid(doc.dimN);

// put content strings together
const content = () => {
  const headers = grid.items(0, doc.cats);
  const cols = grid.assemble(doc.valsByColumn, grid.items);
  return `${headers}\n${cols}`;
};

const outputString = `${grid.style}\n${grid.container(content())}`;

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
