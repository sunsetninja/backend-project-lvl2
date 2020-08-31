import {
  describe, test, expect,
} from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../../src/index.js';

const getFixturesFilePath = (filename) => `__tests__/__fixtures__/${filename}`;

const formatters = [
  'stylish',
  'plain',
  'json',
];

describe.each(formatters)('formatter: %s', (formatter) => {
  const expected = readFileSync(getFixturesFilePath(`expected-${formatter}.txt`), 'utf-8');
  const configExtentions = [
    'json',
    'yml',
    'ini',
  ];

  test.each(configExtentions)('config extention: %s', (configExtention) => {
    expect(
      genDiff(
        getFixturesFilePath(`file1.${configExtention}`),
        getFixturesFilePath(`file2.${configExtention}`),
        formatter,
      ),
    ).toEqual(expected);
  });
});
