// provides css strings and functions to build make an html page with grid

// css styles
const style = {
  // container holds all divs
  // argument number of columns (n)
  // container :: Integer => String
  container: (n) => `.grid-container {
      display: grid;
      grid-template-columns: ${'auto '.repeat(n)};
      grid-auto-flow: row dense;
      background-color: #2196F3;
      padding: 10px;
      grid-gap: 20px;
    }`,
  // css style for first row of grid
  // itemHead :: String
  itemHead: `.grid-item-0- {
      background-color: rgba(255, 255, 255, 0.9);
      grid-row: 1;
      padding: 10px;
    }`,
  // css style for consecutive rows, restricting column to m
  // itemBody :: Integer -> String
  itemBody: (n, m) => `.grid-item-${m || ''}-${n || ''} {
      grid-column: ${n};
      grid-row: ${m ? m + 1 : 'auto'};
      background-color: rgba(255, 255, 255, 0.7);
      padding: 10px;
    }`,
};
Object.freeze(style);


const divs = {
  // item :: String -> String
  item: (n, m) => (s) => `<div class="grid-item-${m || ''}-${n || ''}">${s}</div>`,
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

    // this.items :: Integer -> Integer -> [String] -> String
    this.items = (n, ms) => (a) => a.map((s, i) => divs.item(n, ms ? ms[i] : undefined)(s)).join('\n');

    // this.itemStyle :: Integer -> Integer -> ( Integer -> Function )
    const itemStyle = (n, m) => (n === 0 ? itemHead : itemBody(n, m));

    // Put elements of css grid style together, create itemStyle elements up
    // to dimN elements
    // assembleStyle :: Integer -> String
    const assembleStyle = (i) => (ms) => `<style>
        ${container(dimN)}
        ${zeroToI(i + 1).flatMap((n) => ms.map((m) => itemStyle(n, m))).join('\n')}
      </style>`;

    // this.style :: String
    this.style = assembleStyle(dimN);

    // assembleDivs :: Integer -> Function -> String
    const assembleDivs = (i) => (f, g) => zeroToI(i)
      .flatMap((k) => this.items(k + 1, g(k))(f(k))).join('');

    // this.assemble :: Function -> String
    this.assemble = assembleDivs(dimN);
  }
}

export default Grid;
