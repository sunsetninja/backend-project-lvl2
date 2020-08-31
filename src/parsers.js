import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';

const jsonParser = JSON;

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

const iniParser = { parse: parseIni };

const yamlParser = {
  parse: yaml.safeLoad,
};

const parsers = {
  '.json': jsonParser,
  '.yml': yamlParser,
  '.ini': iniParser,
};

const parseConfig = (confgType, config) => {
  const parser = parsers[confgType];

  return parser.parse(config);
};

export { parseConfig };
