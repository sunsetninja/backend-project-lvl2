import _ from 'lodash';

const { isObject } = _;

function renderIndent(count) {
  return '    '.repeat(count);
}

function renderItems(items, depth) {
  return `{\n${items.join('\n')}\n${renderIndent(depth)}}`;
}

function renderKey(key, depth, sign = ' ') {
  return `  ${renderIndent(depth)}${sign.padEnd(2, ' ')}${key}`;
}

function renderValue(data, depth) {
  if (isObject(data)) {
    const nestedDepth = depth + 1;

    const items = Object
      .entries(data)
      .map(([key, value]) => `${renderKey(key, nestedDepth)}: ${renderValue(value, nestedDepth)}`);

    return renderItems(items, nestedDepth);
  }

  return data;
}

function prettifyDiff(diff, depth = 0) {
  const items = diff.flatMap((node) => {
    const { key, type } = node;

    if (type === 'deleted') {
      return `${renderKey(key, depth, '-')}: ${renderValue(node.prevValue, depth)}`;
    }

    if (type === 'added') {
      return `${renderKey(key, depth, '+')}: ${renderValue(node.value, depth)}`;
    }

    if (type === 'nested') {
      return `${renderKey(key, depth)}: ${prettifyDiff(node.children, depth + 1)}`;
    }

    if (type === 'changed') {
      return [
        `${renderKey(key, depth, '-')}: ${renderValue(node.prevValue, depth)}`,
        `${renderKey(key, depth, '+')}: ${renderValue(node.value, depth)}`,
      ];
    }

    return `${renderKey(key, depth)}: ${renderValue(node.value, depth)}`;
  });

  return renderItems(items, depth);
}

export { prettifyDiff };
