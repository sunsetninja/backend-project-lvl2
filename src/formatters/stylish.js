import _ from 'lodash';
import { nodeTypes } from '../builder.js';

const { isObject } = _;

// Common renderers for all node types
function renderIndent(count) {
  const tabLength = 4;

  return ' '.repeat(tabLength * count);
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

// Nodes renderers by node type
function renderDeleted(node, depth) {
  return `${renderKey(node.key, depth, '-')}: ${renderValue(node.prevValue, depth)}`;
}

function renderAdded(node, depth) {
  return `${renderKey(node.key, depth, '+')}: ${renderValue(node.value, depth)}`;
}

function renderNested(node, depth, formatValue) {
  return `${renderKey(node.key, depth)}: ${formatValue(node.children, depth + 1)}`;
}

function renderChanged(node, depth) {
  return [
    `${renderKey(node.key, depth, '-')}: ${renderValue(node.prevValue, depth)}`,
    `${renderKey(node.key, depth, '+')}: ${renderValue(node.value, depth)}`,
  ];
}

function renderUnchanged(node, depth) {
  return `${renderKey(node.key, depth)}: ${renderValue(node.value, depth)}`;
}

function format(diff, depth = 0) {
  const items = diff.flatMap((node) => {
    switch (node.type) {
      case nodeTypes.deleted:
        return renderDeleted(node, depth);
      case nodeTypes.added:
        return renderAdded(node, depth);
      case nodeTypes.nested:
        return renderNested(node, depth, format);
      case nodeTypes.changed:
        return renderChanged(node, depth);
      case nodeTypes.unchanged:
        return renderUnchanged(node, depth);
      default:
        throw new Error(`unsupported node type ${node.type}`);
    }
  });

  return renderItems(items, depth);
}

export default { format };
