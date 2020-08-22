import _ from 'lodash';
import { readConfigFile } from './reader.js';
import { parseConfigFile } from './parsers.js';
import { buildDiff } from './builder.js';
import { formatDiff } from './formatters/index.js';

const { get } = _;

function genDiff(filepath1, filepath2, options) {
  const format = get(options, 'format', 'stylish');
  const filedata1 = parseConfigFile(filepath1, readConfigFile(filepath1));
  const filedata2 = parseConfigFile(filepath2, readConfigFile(filepath2));

  return formatDiff(buildDiff(filedata1, filedata2), format);
}

export default genDiff;
