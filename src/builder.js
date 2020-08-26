import _ from 'lodash';

const {
  has, union, sortBy, isObject,
} = _;

function buildDiff(obj1, obj2) {
  const allKeys = sortBy(union(Object.keys(obj1).concat(Object.keys(obj2))));

  return allKeys.map((key) => {
    if (!has(obj2, key)) {
      return {
        key,
        type: 'deleted',
        prevValue: obj1[key],
      };
    }

    if (!has(obj1, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }

    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: buildDiff(obj1[key], obj2[key]),
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
}

export default { buildDiff };
