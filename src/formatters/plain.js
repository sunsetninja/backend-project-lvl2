import _ from 'lodash';

const { isObject, isBoolean } = _;

function renderItems(items) {
  return items.join('\n');
}

/**
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
 */

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
