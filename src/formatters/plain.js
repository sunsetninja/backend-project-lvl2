import _ from 'lodash';
import { nodeTypes } from '../builder.js';

const { isObject, isBoolean } = _;

// Common renderers for all node types
function renderItems(items) {
  return items.join('\n');
}

function renderKey(key, type) {
  const typeActions = {
    added: 'added',
    deleted: 'removed',
    changed: 'updated',
  };

  return `Property '${key}' was ${typeActions[type]}`;
}

function renderValue(data) {
  if (isObject(data)) {
    return '[complex value]';
  }

  if (isBoolean(data)) {
    return data;
  }

  return `'${data}'`;
}

// Nodes renderers by node type
function renderDeleted(keyPath) {
  return `${renderKey(keyPath, 'deleted')}`;
}

function renderAdded(node, keyPath) {
  return `${renderKey(keyPath, 'added')} with value: ${renderValue(node.value)}`;
}

function renderNested(node, keyPath, formatValue) {
  return formatValue(node.children, keyPath);
}

function renderChanged(node, keyPath) {
  return `${renderKey(keyPath, 'changed')}. From ${renderValue(node.prevValue)} to ${renderValue(node.value)}`;
}

function format(diff, path = '') {
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
}

export default { format };
