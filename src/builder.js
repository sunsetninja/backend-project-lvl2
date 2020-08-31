import _ from 'lodash';

const nodeTypes = {
  deleted: 'deleted',
  added: 'added',
  nested: 'nested',
  changed: 'changed',
  unchanged: 'unchanged',
};

const buildDiff = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(Object.keys(obj1).concat(Object.keys(obj2))));

  return allKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return {
        key,
        type: nodeTypes.deleted,
        prevValue: obj1[key],
      };
    }

    if (!_.has(obj1, key)) {
      return {
        key,
        type: nodeTypes.added,
        value: obj2[key],
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        type: nodeTypes.nested,
        children: buildDiff(obj1[key], obj2[key]),
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: nodeTypes.changed,
        value: obj2[key],
        prevValue: obj1[key],
      };
    }

    return {
      key,
      type: nodeTypes.unchanged,
      value: obj1[key],
    };
  }, []);
};

export { nodeTypes };
export default { buildDiff };
