import readYmlData from './data.js';
import DecisionObject from './core.js';
import makeView from './view.js';

const inFilePath = './example.yaml';

const YmlDoc = new DecisionObject(readYmlData(inFilePath));


console.log(YmlDoc);
const outputString = `These are the cats: ${YmlDoc.cats} </br>
  and these the values for 0: ${YmlDoc.entries(0)}`;

makeView(outputString);
