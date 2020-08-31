import _ from 'lodash';
import { nodeTypes } from '../builder.js';

const { isObject, isBoolean } = _;

// Common renderers for all node types
const renderItems = (items) => items.join('\n');

const renderKey = (key, type) => {
  const typeActions = {
    added: 'added',
    deleted: 'removed',
    changed: 'updated',
  };

  return `Property '${key}' was ${typeActions[type]}`;
};

const renderValue = (data) => {
  if (isObject(data)) {
    return '[complex value]';
  }

  if (isBoolean(data)) {
    return data;
  }

  return `'${data}'`;
};

// Nodes renderers by node type
const renderDeleted = (keyPath) => `${renderKey(keyPath, 'deleted')}`;

const renderAdded = (node, keyPath) => `${renderKey(keyPath, 'added')} with value: ${renderValue(node.value)}`;

const renderNested = (node, keyPath, formatValue) => formatValue(node.children, keyPath);

const renderChanged = (node, keyPath) => `${renderKey(keyPath, 'changed')}. From ${renderValue(node.prevValue)} to ${renderValue(node.value)}`;

const format = (diff, path = '') => {
  const items = diff.filter(({ type }) => type !== nodeTypes.unchanged).map((node) => {
    const { key, type } = node;
    const keyPath = path ? `${path}.${key}` : key;

    switch (type) {
      case nodeTypes.deleted:
        return renderDeleted(keyPath);
      case nodeTypes.added:
        return renderAdded(node, keyPath);
      case nodeTypes.nested:
        return renderNested(node, keyPath, format);
      case nodeTypes.changed:
        return renderChanged(node, keyPath);
      default:
        throw new Error(`unsupported node type ${type}`);
    }
  });

  return renderItems(items, path);
};

export default { format };
