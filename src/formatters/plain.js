import _ from 'lodash';
import { nodeTypes } from '../builder.js';

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
  if (_.isObject(data)) {
    return '[complex value]';
  }

  if (_.isBoolean(data)) {
    return data;
  }

  return `'${data}'`;
};

const format = (diff, path = '') => {
  const items = diff.filter(({ type }) => type !== nodeTypes.unchanged).map((node) => {
    const { key, type } = node;
    const keyPath = path ? `${path}.${key}` : key;

    switch (type) {
      case nodeTypes.deleted:
        return `${renderKey(keyPath, 'deleted')}`;
      case nodeTypes.added:
        return `${renderKey(keyPath, 'added')} with value: ${renderValue(node.value)}`;
      case nodeTypes.nested:
        return format(node.children, keyPath);
      case nodeTypes.changed:
        return `${renderKey(keyPath, 'changed')}. From ${renderValue(node.prevValue)} to ${renderValue(node.value)}`;
      default:
        throw new Error(`unsupported node type ${type}`);
    }
  });

  return renderItems(items, path);
};

export default { format };
