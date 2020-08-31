import reader from './reader.js';
import { parseConfigFile } from './parsers/index.js';
import builder from './builder.js';
import { formatDiff } from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const filedata1 = parseConfigFile(filepath1, reader.readConfigFile(filepath1));
  const filedata2 = parseConfigFile(filepath2, reader.readConfigFile(filepath2));

  return formatDiff(builder.buildDiff(filedata1, filedata2), format);
};

export default genDiff;
