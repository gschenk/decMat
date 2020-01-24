// provides css strings and functions to build make an html page with grid

// css styles
const style = {
  // container holds all divs
  // argument number of columns (m)
  // container :: Integer => String
  container: (m) => `.grid-container {
      display: grid;
      grid-template-columns: ${'auto '.repeat(m)};
      grid-auto-flow: row dense;
      background-color: #2196F3;
      padding: 10px;
      grid-gap: 20px;
    }`,
  // css style for first row of grid
  // itemHead :: String
  itemHead: `.grid-item0 {
      background-color: rgba(255, 255, 255, 0.9);
      grid-row: 1;
      padding: 10px;
    }`,
  // css style for consecutive rows, restricting column to m
  // itemBody :: Integer -> String
  itemBody: (m) => `.grid-item${m} {
      grid-column: ${m};
      background-color: rgba(255, 255, 255, 0.7);
      padding: 10px;
    }`,
};
Object.freeze(style);


const divs = {
  // item :: String -> String
  item: (m) => (s) => `<div class="grid-item${m}">${s}</div>`,
  // container :: String -> String
  container: (s) => `<div class="grid-container">${s}</div>`,
};
Object.freeze(divs);


// Grid class provides methods to generate a css m*n grid
class Grid {
// Grid :: Integer -> Object -> Object -> Object
  constructor(dimN) {
    // strings and functions to set css style
    const {
      container,
      itemHead,
      itemBody,
    } = style;

    const zeroToI = (i) => [...Array(i).keys()];

    // this.container :: String -> String
    this.container = (s) => divs.container(s);

    // this.items :: Integer -> [String] -> String
    this.items = (n, a) => a.map(divs.item(n)).join('\n');

    // this.itemStyle :: Integer -> ( Integer -> Function )
    const itemStyle = (n) => (n === 0 ? itemHead : itemBody(n));

    // Put elements of css grid style together, create itemStyle elements up
    // to dimN elements
    // assembleStyle :: Integer -> String
    const assembleStyle = (i) => `<style>
        ${container(dimN)}
        ${zeroToI(i + 1).flatMap(itemStyle).join('\n')}
      </style>`;

    // this.style :: String
    this.style = assembleStyle(dimN);

    // assembleDivs :: Integer -> Function -> String
    const assembleDivs = (i) => (f) => zeroToI(i).flatMap((k) => this.items(k + 1, f(k))).join('');

    // this.assemble :: Function -> String
    this.assemble = assembleDivs(dimN);
  }
}

module.exports = Grid;
