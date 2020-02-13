
// css styles
const styles = {
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
Object.freeze(styles);

export default styles;
