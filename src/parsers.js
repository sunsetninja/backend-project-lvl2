import yaml from 'js-yaml';
import path from 'path';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

function parseFile(filepath, filecontent) {
  const parser = parsers[path.extname(filepath)];

  return parser(filecontent);
}

export { parseFile };
