import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import { parseFile } from './parsers';

const {
  has, union, sortBy, isPlainObject,
} = _;

function getDiff(obj1, obj2) {
  const allKeys = union(Object.keys(obj1).concat(Object.keys(obj2)));

  const diff = allKeys.reduce((acc, key) => {
    // удаление
    if (has(obj1, key) && !has(obj2, key)) {
      return [...acc, {
        key,
        action: 'deleted',
        prevValue: obj1[key],
      }];
    }

    // добавление
    if (!has(obj1, key) && has(obj2, key)) {
      return [...acc, {
        key,
        action: 'added',
        value: obj2[key],
      }];
    }

    // изменение
    if (has(obj1, key) && has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return [...acc, {
          key,
          action: 'not_edited',
          value: obj2[key],
        }];
      }

      // TODO: добавить обработку массивов
      if (isPlainObject(obj1[key]) && isPlainObject(obj2[key])) {
        return [...acc, {
          key,
          action: 'edited',
          diff: getDiff(obj1[key], obj2[key]),
        }];
      }

      return [...acc, {
        key,
        action: 'deleted',
        prevValue: obj1[key],
      }, {
        key,
        action: 'added',
        value: obj2[key],
      }];
    }

    return acc;
  }, []);

  return sortBy(diff, ['key']);
}

function prettyDiff(diff) {
  return diff.reduce((acc, item) => {
    const { key, action } = item;
    if (action === 'deleted') {
      return {
        ...acc,
        [`- ${key}`]: item.prevValue,
      };
    }

    if (action === 'added') {
      return {
        ...acc,
        [`+ ${key}`]: item.value,
      };
    }

    if (item.diff) {
      return {
        ...acc,
        [`  ${key}`]: prettyDiff(item.diff),
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
