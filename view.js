import http from 'http';

function makeView(body) {
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(body);
  }).listen(8080);
}

export default makeView;
