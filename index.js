import readYmlData from './data.js';
import DecisionObject from './core.js';
import { makeView, Grid } from './view.js';

const inFilePath = './example.yaml';

const YmlDoc = new DecisionObject(readYmlData(inFilePath));

console.log(YmlDoc);

const grid = new Grid(YmlDoc.dimM);

// put content strings together
const contentHeaders = grid.items(0, YmlDoc.cats);
const contentColumns = YmlDoc.zeroToM.flatMap((i) => grid.items(i + 1, YmlDoc.valsByColumn(i))).join('');
const content = `${contentHeaders}${contentColumns}`;

const outputString = `${grid.style} ${grid.container(content)}`;


makeView(outputString);
