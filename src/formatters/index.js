import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish: stylish.format,
  plain: plain.format,
};

function formatDiff(diff, type) {
  const formatter = formatters[type];

  return formatter(diff);
}

export { formatDiff };
