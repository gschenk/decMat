import http from 'http';

import readYmlData from './data.js';


const inFilePath = './example.yaml';

// constructor
function DecisionObject(o) {
  const cats = Object.keys(o);
  this.cats = cats;

  // access values by number of n of category.
  const entries = (n) => o[cats[n]];
  this.entries = entries;

  this.dimX = Object.keys(o).length;
  // the largest number of values assigned to any key cat of object o.
  this.dimY = Math.max(...cats.map((k) => o[k].length));
}

const YmlDoc = new DecisionObject(readYmlData(inFilePath));


const ymlKeys = YmlDoc.cats;

console.log(YmlDoc);

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`My This is a Brief Hello World! ${ymlKeys}[0]`);
}).listen(8080);
