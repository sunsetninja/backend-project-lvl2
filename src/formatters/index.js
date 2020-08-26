import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish: stylish.format,
  plain: plain.format,
  json: json.format,
};

function formatDiff(diff, type) {
  const formatter = formatters[type];

  return formatter(diff);
}

export { formatDiff };
