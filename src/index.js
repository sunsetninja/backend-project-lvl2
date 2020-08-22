import { readConfigFile } from './reader.js';
import { parseConfigFile } from './parsers.js';
import { buildDiff } from './builder.js';
import { prettifyDiff } from './prettifier.js';

function genDiff(filepath1, filepath2) {
  const filedata1 = parseConfigFile(filepath1, readConfigFile(filepath1));
  const filedata2 = parseConfigFile(filepath2, readConfigFile(filepath2));

  return prettifyDiff(buildDiff(filedata1, filedata2));
}

export default genDiff;
