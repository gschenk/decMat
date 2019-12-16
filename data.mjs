// reads content from yaml and provides object with its contents
import yaml from 'js-yaml';
import fs from 'fs';

// const yaml = require('js-yaml');
// const fs = require('fs');

// mutable variable to get it before try scope

function readYmlData(inFilePath) {
  let YmlDoc = {};
  // safeLoad from js-yaml loads one document per yaml file
  try {
    YmlDoc = yaml.safeLoad(fs.readFileSync(inFilePath, 'utf8'));
  } catch (e) {
    console.log(e);
  }
  return YmlDoc;
}

export default readYmlData;
