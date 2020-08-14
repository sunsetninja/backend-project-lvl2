#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../src/index.js';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  })
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
