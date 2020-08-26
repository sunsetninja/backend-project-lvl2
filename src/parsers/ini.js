import ini from 'ini';
import _ from 'lodash';

const { mapValues, isObject } = _;

function isNumeric(value) {
  return !Number.isNaN(parseFloat(value)) && Number.isFinite(Number(value));
}

const numberifyValues = (data) => mapValues(data, (value) => {
  if (isObject(value)) {
    return numberifyValues(value);
  }
  if (isNumeric(value)) {
    return parseFloat(value);
  }

  return value;
});

const parseIni = (filecontent) => numberifyValues(ini.parse(filecontent));

export default { parse: parseIni };
