import http from 'http';

// methods to generate a css m*n grid
// .Grid :: Integer -> Object
function Grid(bigM) {
  const zeroToM = [...Array(bigM + 1).keys()];

  // gridItem :: String -> String
  const gridItem = (m) => (str) => `<div class="grid-item${m}">${str}</div>`;

  // .container :: String -> String
  this.container = (items) => `<div class="grid-container">${items}</div>`;

  // .items :: [String] -> String
  this.items = (n, a) => a.map(gridItem(n)).join('\n');


  // css styles
  // container holds all items
  // The number of rows depends on matrix dimension M
  const containerStyle = `.grid-container {
      display: grid;
      grid-template-columns: ${'auto '.repeat(bigM)};
      grid-auto-flow: row dense;
      background-color: #2196F3;
      padding: 10px;
      grid-gap: 20px;
    }`;

  // css style for first row of grid
  const itemHeadStyle = `.grid-item0 {
      background-color: rgba(255, 255, 255, 0.9);
      grid-row: 1;
      padding: 10px;
    }`;

  // css style for consecutive rows, restricting column to i
  // itemBodyStyle :: Integer -> String
  const itemBodyStyle = (m) => `.grid-item${m} {
      grid-column: ${m};
      background-color: rgba(255, 255, 255, 0.7);
      padding: 10px;
    }`;

  // itemStyle :: Integer -> ( Integer -> Function )
  const itemStyle = (m) => (m === 0 ? itemHeadStyle : itemBodyStyle(m));

  // Put elements of css grid style together, create itemStyle elements up
  // to bigN elements
  // .style :: String -> String
  this.style = `<style>
      ${containerStyle}
      ${zeroToM.flatMap(itemStyle).join('\n')}
    </style>`;
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
