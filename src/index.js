import path from 'path';
import reader from './reader.js';
import { parseConfig } from './parsers.js';
import builder from './builder.js';
import { formatDiff } from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const filedata1 = parseConfig(path.extname(filepath1), reader.readConfigFile(filepath1));
  const filedata2 = parseConfig(path.extname(filepath2), reader.readConfigFile(filepath2));

  return formatDiff(builder.buildDiff(filedata1, filedata2), format);
};

export default genDiff;
