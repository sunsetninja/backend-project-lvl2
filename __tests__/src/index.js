import { describe, test, expect } from '@jest/globals';
import genDiff from '../../src/index.js';

function getFixturesFilePath(filename) {
  return `__tests__/__fixtures__/${filename}`;
}

describe('genDiff tests', () => {
  test('should return correct result with flat JSON files', () => {
    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(getFixturesFilePath('file1.json'), getFixturesFilePath('file2.json'))).toEqual(expected);
  });
});
