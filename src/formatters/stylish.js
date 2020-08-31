import _ from 'lodash';
import { nodeTypes } from '../builder.js';

const { isObject } = _;

// Common renderers for all node types
const renderIndent = (count) => {
  const tabLength = 4;

  return ' '.repeat(tabLength * count);
};

const renderItems = (items, depth) => `{\n${items.join('\n')}\n${renderIndent(depth)}}`;

const renderKey = (key, depth, sign = ' ') => `  ${renderIndent(depth)}${sign.padEnd(2, ' ')}${key}`;

const renderValue = (data, depth) => {
  if (isObject(data)) {
    const nestedDepth = depth + 1;

    const items = Object
      .entries(data)
      .map(([key, value]) => `${renderKey(key, nestedDepth)}: ${renderValue(value, nestedDepth)}`);

    return renderItems(items, nestedDepth);
  }

  return data;
};

// Nodes renderers by node type
const renderDeleted = (node, depth) => `${renderKey(node.key, depth, '-')}: ${renderValue(node.prevValue, depth)}`;

const renderAdded = (node, depth) => `${renderKey(node.key, depth, '+')}: ${renderValue(node.value, depth)}`;

const renderNested = (node, depth, formatValue) => `${renderKey(node.key, depth)}: ${formatValue(node.children, depth + 1)}`;

const renderChanged = (node, depth) => [
  `${renderKey(node.key, depth, '-')}: ${renderValue(node.prevValue, depth)}`,
  `${renderKey(node.key, depth, '+')}: ${renderValue(node.value, depth)}`,
];

const renderUnchanged = (node, depth) => `${renderKey(node.key, depth)}: ${renderValue(node.value, depth)}`;

const format = (diff, depth = 0) => {
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
};

export default { format };
