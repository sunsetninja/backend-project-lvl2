import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const formatDiff = (diff, type) => {
  const formatter = formatters[type];

  return formatter.format(diff);
};

export { formatDiff };
