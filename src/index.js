import http from 'http';
import {
  checkArgv,
  readYmlData,
} from './data.js';
import DecisionMatrixO from './core.js';
import Grid from './grid.js';

const foobar = checkArgv();

// define yaml input file
const inFilePath = (o = foobar) => {
  if (o.stdin) return 0;
  if (o.file) return o.file;
  return './example.yaml';
};
console.log(`Input file: ${foobar.stdin ? 'STDIN' : inFilePath()}`);

// create object with data from yaml input and methods
const doc = new DecisionMatrixO(readYmlData(inFilePath()));

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
