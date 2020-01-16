import http from 'http';

// methods to generate a css m*n grid
function Grid(m) {
  const gridItem = (str) => `<div class="grid-item">${str}</div>`;
  this.items = (a) => a.map(gridItem).join('\n');
  this.container = (items) => `<div class="grid-container">${items}</div>`;
  this.style = `<style> .grid-container { display: grid; grid-template-columns: ${'auto '.repeat(m)}; } </style>`;
}

// creating the server with one page
function makeView(content) {
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
  }).listen(8080);
}

export { Grid, makeView };
