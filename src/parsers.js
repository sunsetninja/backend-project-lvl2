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
  json: { parse: JSON.parse },
  yml: { parse: yaml.safeLoad },
  ini: { parse: parseIni },
};

const parseData = (type, data) => {
  const parser = parsers[type];

  return parser.parse(data);
};

export { parseData };
