const http = require('http');

const {
  checkArgv,
  readYmlData,
} = require('./data.js');

const DecisionMatrixO = require('./core.js');
const Grid = require('./grid.js');

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
const contentHeaders = grid.items(0, doc.cats);
const contentColumns = doc.zeroToN.flatMap((i) => grid.items(i + 1, doc.valsByColumn(i))).join('');
const content = `${contentHeaders}\n${contentColumns}`;

const outputString = `${grid.style}\n${grid.container(content)}`;

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
