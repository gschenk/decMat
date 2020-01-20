// css styles
const gridStyleO = {
  // container holds all items
  // argument number of columns (m)
  // containerStyle :: Integer => String
  containerStyle: (m) => `.grid-container {
      display: grid;
      grid-template-columns: 2em ${'auto '.repeat(m)};
      grid-auto-flow: row dense;
      background-color: #2196F3;
      padding: 10px;
      grid-gap: 20px;
    }`,

  // css style for top legend of grid
  // itemTopLegendStyle :: String
  itemTopLegendStyle: `.grid-top-legend{
      background-color: rgba(255, 255, 255, 0.3);
      grid-row: 1;
      grid-column-start: 2;
      grid-column-end: -1;
      padding: 10px;
    }`,

  // css style for left legend of grid
  // itemLeftLegendStyle :: String
  itemLeftLegendStyle: (m) => `.grid-left-legend{
      background-color: rgba(255, 255, 255, 0.3);
      grid-column: 1;
      grid-row: 3 / span ${m};
      padding: 0.5em;
    }`,

  // empty block as a place holder
  // itemEmpty :: Integer => Integer => String
  emptyStyle: (m, n) => `.grid-empty{
      background-color: rgba(255, 255, 255, 0.0);
      grid-row: ${m};
      grid-column: ${n};
      padding: 10px;
  }`,

  // css style for first row of grid
  // itemHeadStyle :: String
  itemHeadStyle: `.grid-item0 {
      background-color: rgba(255, 255, 255, 0.9);
      grid-row: 2;
      padding: 10px;
    }`,

  // css style for consecutive rows, restricting column to m
  // itemBodyStyle :: Integer -> String
  itemBodyStyle: (m) => `.grid-item${m} {
      grid-column: ${m + 1};
      background-color: rgba(255, 255, 255, 0.7);
      padding: 10px;
    }`,
};
Object.freeze(gridStyleO);


const gridItemsO = {
  // topLegendDefault:: String
  topLegendDefault: '&longleftarrow; Priority',

  // leftLegendDefault:: String
  leftLegendDefault: '&uarr; G o o d &ndash; B a d &darr;',

  // empty:: String -> String
  empty: (s) => `<div class="grid-empty">${s}</div>`,

  // itemTopLegend:: String -> String
  itemTopLegend: (s) => `<div class="grid-top-legend">${s}</div>`,

  // itemLeftLegend:: String -> String
  itemLeftLegend: (s) => `<div class="grid-left-legend">${s}</div>`,

  // gridItem :: String -> String
  gridItem: (m) => (s) => `<div class="grid-item${m}">${s}</div>`,

  // makeContainerStr :: String -> String
  makeContainerStr: (s) => `<div class="grid-container">${s}</div>`,
};
Object.freeze(gridItemsO);


// methods to generate a css m*n grid
// .Grid :: Integer -> Object
class Grid {
  constructor(dimN, dimM, styleO, itemsO) {
    // strings and functions to set css style
    const {
      containerStyle,
      itemHeadStyle,
      itemBodyStyle,
    } = styleO;
    const emptyStyle = styleO.emptyStyle(2, 1);

    const {
      gridItem,
      makeContainerStr,
    } = itemsO;
    const zeroToM = [...Array(dimN + 1).keys()];
    const topLegend = itemsO.itemTopLegend(itemsO.topLegendDefault);
    const leftLegend = itemsO.itemLeftLegend(itemsO.leftLegendDefault);
    const emptyLegend = (itemsO.empty)('');
    this.legends = `${topLegend}${emptyLegend}${leftLegend}`;

    // container :: String -> String
    this.container = (str) => makeContainerStr(str);

    // .items :: Integer -> [String] -> String
    this.items = (n, a) => a.map(gridItem(n)).join('\n');

    // itemStyle :: Integer -> ( Integer -> Function )
    const itemStyle = (m) => (m === 0 ? itemHeadStyle : itemBodyStyle(m));

    // Put elements of css grid style together, create itemStyle elements up
    // to bigN elements
    // .style :: String
    this.style = `<style>
        ${containerStyle(dimN)}
        ${styleO.itemTopLegendStyle}
        ${emptyStyle}
        ${styleO.itemLeftLegendStyle(dimM)}
        ${zeroToM.flatMap(itemStyle).join('\n')}
      </style>`;
  }
}

export {
  Grid,
  gridStyleO,
  gridItemsO,
};
