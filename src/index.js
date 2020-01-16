import readYmlData from './data.js';
import DecisionObject from './core.js';
import { makeView, Grid } from './view.js';

const inFilePath = './example.yaml';

const YmlDoc = new DecisionObject(readYmlData(inFilePath));

console.log(YmlDoc);


const decMatItems = [...YmlDoc.cats, ...[0, 1].flatMap(YmlDoc.valsByRow)];

const grid = new Grid(3);
const outputString = `${grid.style} ${grid.container(grid.items(decMatItems))}`;


makeView(outputString);
