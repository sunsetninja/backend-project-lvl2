import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import { parseFile } from './parsers.js';

const {
  has, union, sortBy, isObject,
} = _;

function getDiff(obj1, obj2) {
  const allKeys = sortBy(union(Object.keys(obj1).concat(Object.keys(obj2))));

  const diff = allKeys.map((key) => {
    // удаление
    if (!has(obj2, key)) {
      return {
        key,
        type: 'deleted',
        prevValue: obj1[key],
      };
    }

    // добавление
    if (!has(obj1, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }

    // изменение
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: getDiff(obj1[key], obj2[key]),
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: 'changed',
        value: obj2[key],
        prevValue: obj1[key],
      };
    }

    return {
      key,
      type: 'unchanged',
      value: obj1[key],
    };
  }, []);

  return diff;
}

function prettyDiff(diff) {
  return diff.reduce((acc, item) => {
    const { key, type } = item;
    if (type === 'deleted') {
      return {
        ...acc,
        [`- ${key}`]: item.prevValue,
      };
    }

    if (type === 'added') {
      return {
        ...acc,
        [`+ ${key}`]: item.value,
      };
    }

    if (type === 'nested') {
      return {
        ...acc,
        [`  ${key}`]: prettyDiff(item.children),
      };
    }

    return {
      ...acc,
      [`  ${key}`]: item.value,
    };
  }, {});
}

function diffToString(diff) {
  // TODO: удалять нужно только последнюю запятую в строке
  return JSON.stringify(diff, null, 2).replace(/["|,]/g, '');
}

function genDiff(filepath1, filepath2) {
  const filedata1 = parseFile(filepath1, readFileSync(path.resolve(filepath1), 'utf-8'));
  const filedata2 = parseFile(filepath2, readFileSync(path.resolve(filepath2), 'utf-8'));

  return diffToString(prettyDiff(getDiff(filedata1, filedata2)));
}

export { getDiff, prettyDiff, diffToString };
export default genDiff;
