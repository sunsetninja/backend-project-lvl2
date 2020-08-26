import _ from 'lodash';

const { isObject, isBoolean } = _;

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

function format(diff, path = '') {
  const items = diff.filter(({ type }) => type !== 'unchanged').flatMap((node) => {
    const { key, type } = node;
    const keyPath = path ? `${path}.${key}` : key;

    if (type === 'deleted') {
      return `${renderKey(keyPath, 'deleted')}`;
    }

    if (type === 'added') {
      return `${renderKey(keyPath, 'added')} with value: ${renderValue(node.value)}`;
    }

    if (type === 'nested') {
      return format(node.children, keyPath);
    }

    if (type === 'changed') {
      return `${renderKey(keyPath, 'changed')}. From ${renderValue(node.prevValue)} to ${renderValue(node.value)}`;
    }

    return `${renderKey(keyPath)}: ${renderValue(node, keyPath)}`;
  });

  return renderItems(items, path);
}

export default { format };
