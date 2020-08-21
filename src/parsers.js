import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

function parseFile(filepath, filecontent) {
  const parser = parsers[path.extname(filepath)];

  return parser(filecontent);
}

export { parseFile };
