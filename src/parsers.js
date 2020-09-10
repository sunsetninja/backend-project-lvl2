import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';

const isNumeric = (value) => !Number.isNaN(parseFloat(value)) && Number.isFinite(Number(value));

const numberifyValues = (data) => _.mapValues(data, (value) => {
  if (_.isObject(value)) {
    return numberifyValues(value);
  }
  if (isNumeric(value)) {
    return parseFloat(value);
  }

  return value;
});

const parseIni = (filecontent) => numberifyValues(ini.parse(filecontent));

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

const parseData = (type, data) => {
  const parse = parsers[type];

  return parse(data);
};

export { parseData };
