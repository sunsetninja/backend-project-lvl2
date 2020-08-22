import {
  describe, test, expect,
} from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../../src/index.js';

function getFixturesFilePath(filename) {
  return `__tests__/__fixtures__/${filename}`;
}

describe('genDiff tests', () => {
  const expectedFlat = readFileSync(getFixturesFilePath('expected-flat.txt'), 'utf-8');
  const expectedNested = readFileSync(getFixturesFilePath('expected-nested.txt'), 'utf-8');

  test.each([
    ['file1.json', 'file2.json', expectedFlat],
    ['file1.yml', 'file2.yml', expectedFlat],
    ['file1.ini', 'file2.ini', expectedFlat],
  ])('should return correct diff output with flat configs: %s %s', (filename1, filename2, expected) => {
    expect(
      genDiff(getFixturesFilePath(filename1), getFixturesFilePath(filename2)),
    ).toEqual(expected);
  });

  test.each([
    ['file1-nested.json', 'file2-nested.json', expectedNested],
  ])('should return correct diff output with nested configs: %s %s', (filename1, filename2, expected) => {
    expect(
      genDiff(getFixturesFilePath(filename1), getFixturesFilePath(filename2)),
    ).toEqual(expected);
  });
});
