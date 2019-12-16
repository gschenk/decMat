import http from 'http';
import YmlDoc from './data.mjs';


const ymlKeys = Object.keys(YmlDoc);

console.log(YmlDoc);

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`My This is a Brief Hello World! ${ymlKeys}[0]`);
}).listen(8080);
