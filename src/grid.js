// provides css strings and functions to build make an html page with grid
import Styles from './css.js';

const zeroToI = (i) => [...Array(i).keys()];

const divs = {
  // item :: String -> String
  item: (m, n) => (s) => `<div class="grid-item-${m}-${n}">${s}</div>`,
  // container :: String -> String
  container: (s) => `<div class="grid-container">\n${s}\n</div>`,
};
Object.freeze(divs);

// contentGrid :: [[String]] -> String
const contentGrid = (ass) => ass
  .map((bs, m) => bs.map((s, n) => divs.item(m + 1, n + 1)(s)))
  .flat()
  .join('\n');


const style = new Styles();
// styleGrid :: Integer -> Integer -> String
const styleGrid = (hasHead) => (dimM, dimN) => {
  const ms = zeroToI(dimM + 1).slice(1);
  const ns = zeroToI(dimN + 1).slice(1);
  const head = hasHead ? style.headItem : style.bodyItem;
  const body = style.bodyItem;
  const item = (m, n) => (m * n === 0 ? head(m, n) : body(m, n));
  return ms.map((m) => ns.map((n) => item(m, n)))
    .flat()
    .join('');
};

class Grid {
  constructor(dimM, dimN, hasHead = false) {
    this.style = `${style.container(dimN)} ${styleGrid(hasHead)(dimM, dimN)}`;

    // content function expects a nested M, N array, where the outer
    // array holds M arrays of length N. The string value of each
    // array element will be printed in a grid box corresponding to
    // its position in the arrays.
    // content :: [[String]] -> String
    this.content = (contents) => divs.container(contentGrid(contents));
  }
}

export default Grid;
