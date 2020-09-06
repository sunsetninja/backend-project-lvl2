import path from 'path';
import reader from './reader.js';
import { parseData } from './parsers.js';
import builder from './builder.js';
import { formatDiff } from './formatters/index.js';

const getConfigType = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const filedata1 = parseData(getConfigType(filepath1), reader.readConfigFile(filepath1));
  const filedata2 = parseData(getConfigType(filepath2), reader.readConfigFile(filepath2));

  return formatDiff(builder.buildDiff(filedata1, filedata2), format);
};

export default genDiff;
