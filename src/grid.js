// provides css strings and functions to build make an html page with grid
import tools from './tools.js';

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
  .map((bs, n) => bs.map((s, m) => (s !== ''
    ? divs.item(m + 1, n + 1)(s)
    : '')))
  .flat()
  .join('\n');


const whichItem = (style) => (m, n) => {
  const token = `${m > 1 ? 'm' : 1}${n > 1 ? 'n' : 1}`;
  const cases = {
    11: style.emptyItem(m, n),
    m1: style.headItem(m, n),
    '1n': style.headItem(m, n),
  };
  return tools.pureSwitch(cases)(style.bodyItem(m, n))(token);
};

// styleGrid :: Integer -> Integer -> String
const styleGrid = (itemF) => (dimM, dimN) => {
  const ms = zeroToI(dimM + 1).slice(1);
  const ns = zeroToI(dimN + 1).slice(1);
  return ms.map((m) => ns.map((n) => itemF(m, n)))
    .flat()
    .join('');
};

class Grid {
  constructor(dimM, dimN, style, hasHead = false) {
    const strStyleGrid = styleGrid(hasHead ? whichItem(style) : style.bodyItem)(dimM, dimN);
    this.style = `${style.container(dimN)} ${strStyleGrid}`;

    // content function expects a nested M, N array, where the outer
    // array holds N arrays of length M. Each inner array represents a column
    // The string value of each array element will be printed in a grid box
    // corresponding to its position in the arrays.
    // content :: [[String]] -> String
    this.content = (contents) => divs.container(contentGrid(contents));
  }
}

export default Grid;
