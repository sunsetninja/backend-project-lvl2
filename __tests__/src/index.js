import {
  describe, test, expect,
} from '@jest/globals';
import genDiff from '../../src/index.js';

function getFixturesFilePath(filename) {
  return `__tests__/__fixtures__/${filename}`;
}

describe('genDiff tests', () => {
  const expectedFlat = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  test.each([
    ['file1.json', 'file2.json', expectedFlat],
    ['file1.yml', 'file2.yml', expectedFlat],
    ['file1.ini', 'file2.ini', expectedFlat],
  ])('should return correct diff output with flat configs: %s %s', (filename1, filename2, expected) => {
    expect(
      genDiff(getFixturesFilePath(filename1), getFixturesFilePath(filename2)),
    ).toEqual(expected);
  });
});
