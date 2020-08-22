import stylish from './stylish.js';

const formatters = {
  stylish: stylish.format,
};

function formatDiff(diff, type) {
  const formatter = formatters[type];

  return formatter(diff);
}

export { formatDiff };
