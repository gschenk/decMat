const yaml = require('js-yaml');
const fs = require('fs');
const http = require('http');


let ymlDoc = {};
// read from yaml
try {
  ymlDoc = yaml.safeLoad(fs.readFileSync('./example.yaml', 'utf8'));
} catch (e) {
  console.log(e);
}

const ymlKeys = Object.keys(ymlDoc);

console.log(ymlDoc);

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`My This is a Brief Hello World! ${ymlKeys}[0]`);
}).listen(8080);
