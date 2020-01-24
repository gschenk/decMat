import http from 'http';
import data from './data.js';
import DecisionMatrixO from './core.js';
import Grid from './grid.js';
import args from './args.js'
import tools from './tools.js'

const config = args.check(process.argv);

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

// define yaml input file
const inFilePath = (o = config) => {
  if (o.stdin) return 0;
  if (o.file) return o.file;
  return './example.yaml';
};
console.log(`Input file: ${config.stdin ? 'STDIN' : inFilePath()}`);

// create object with data from yaml input and methods
const doc = new DecisionMatrixO(data.readYaml(inFilePath()));

console.log(doc);

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
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(str);
    res.end();
  }).listen(8080);
}

makeView(outputString);
