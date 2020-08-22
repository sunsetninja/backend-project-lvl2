import {
  describe, test, expect,
} from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../../src/index.js';

function getFixturesFilePath(filename) {
  return `__tests__/__fixtures__/${filename}`;
}

describe('genDiff tests', () => {
  describe('stylish formatter', () => {
    const expected = readFileSync(getFixturesFilePath('expected-stylish.txt'), 'utf-8');

    test.each([
      'json', 'yml', 'ini',
    ])('should return correct diff output with configs with type: %s', (configExtention) => {
      expect(
        genDiff(
          getFixturesFilePath(`file1.${configExtention}`),
          getFixturesFilePath(`file2.${configExtention}`),
          { format: 'stylish' },
        ),
      ).toEqual(expected);
    });
  });

  describe('plain formatter', () => {
    const expected = readFileSync(getFixturesFilePath('expected-plain.txt'), 'utf-8');

    test.each([
      'json', 'yml', 'ini',
    ])('should return correct diff output with configs with type: %s', (configExtention) => {
      expect(
        genDiff(
          getFixturesFilePath(`file1.${configExtention}`),
          getFixturesFilePath(`file2.${configExtention}`),
          { format: 'plain' },
        ),
      ).toEqual(expected);
    });
  });
});
