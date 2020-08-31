import path from 'path';

import json from './json.js';
import ini from './ini.js';
import yaml from './yaml.js';

const parsers = {
  '.json': json,
  '.yml': yaml,
  '.ini': ini,
};

const parseConfigFile = (filepath, filecontent) => {
  const parser = parsers[path.extname(filepath)];

  return parser.parse(filecontent);
};

export { parseConfigFile };
