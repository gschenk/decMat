// reads content from yaml and provides object with its contents
import yaml from 'js-yaml';
import fs from 'fs';

// const data = fs.readFileSync(0, "utf-8");
function readYaml(inFilePath) {
  // mutable binding to get variable before try scope
  let YmlDoc = {};
  // safeLoad from js-yaml loads one document per yaml file
  try {
    YmlDoc = yaml.safeLoad(fs.readFileSync(inFilePath, 'utf8'));
  } catch (e) {
    console.log(e);
  }
  return YmlDoc;
}

export default {
  readYaml,
};
