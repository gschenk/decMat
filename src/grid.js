// provides css strings and functions to build make an html page with grid
import styles from './css.js';


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
    // strings and functions to set css styles
    const {
      container,
      itemHead,
      itemBody,
    } = styles;

    const zeroToI = (i) => [...Array(i).keys()];

    // this.container :: String -> String
    this.container = (s) => divs.container(s);

    // this.items :: Integer -> Integer -> [String] -> String
    this.items = (n, ms) => (a) => a.map((s, i) => divs.item(n, ms ? ms[i] : undefined)(s)).join('\n');

    // this.itemStyle :: Integer -> Integer -> ( Integer -> Function )
    const itemStyle = (n, m) => (n === 0 ? itemHead : itemBody(n, m));

    // Put elements of css grid styles together, create itemStyle elements up
    // to dimN elements
    // assembleStyle :: Integer -> String
    const assembleStyle = (i) => (ms) => `<styles>
        ${container(dimN)}
        ${zeroToI(i + 1).flatMap((n) => ms.map((m) => itemStyle(n, m))).join('\n')}
      </styles>`;

    // this.styles :: String
    this.styles = assembleStyle(dimN);

    // assembleDivs :: Integer -> Function -> String
    const assembleDivs = (i) => (f, g) => zeroToI(i)
      .flatMap((k) => this.items(k + 1, g(k))(f(k))).join('');

    // this.assemble :: Function -> String
    this.assemble = assembleDivs(dimN);
  }
}

export default Grid;
