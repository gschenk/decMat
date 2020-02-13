// css styles
// container holds all divs
// argument number of columns (n)
// container :: Integer => String
const container = (colour = '#2196F3', gap = 10) => (n) => `.grid-container {
  display: grid;
  grid-template-columns: ${'auto '.repeat(n)};
  grid-auto-flow: row dense;
  background-color: ${colour};
  padding: 10px;
  grid-gap: ${gap}px;
}`;

// css style for consecutive rows, restricting column to m
// itemBody :: Integer i => i -> i -> i -> String
const item = (a, r, g, b) => (m, n) => `
.grid-item-${m}-${n} {
  grid-row: ${m};
  grid-column: ${n};
  background-color: rgba(${r}, ${g}, ${b}, ${a});
  padding: 10px;
}`;

class Styles {
  constructor(settings) {
    const {
      containerColour = '#2196F3',
      gridGap = 10,
      headColour = [255, 255, 255],
      headOpacity = 1,
      bodyColour = [255, 255, 255],
      bodyOpacity = 0.7,
    } = settings || {};
    this.headItem = item(headOpacity, ...headColour);
    this.bodyItem = item(bodyOpacity, ...bodyColour);
    this.container = container(containerColour, gridGap);
  }
}
export default Styles;
