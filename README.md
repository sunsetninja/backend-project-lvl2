# Gendiff

[![Maintainability](https://api.codeclimate.com/v1/badges/e4374d236ab3aca28e8a/maintainability)](https://codeclimate.com/github/sunsetninja/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e4374d236ab3aca28e8a/test_coverage)](https://codeclimate.com/github/sunsetninja/backend-project-lvl2/test_coverage)

## Installation

```sh
  make install
```

## Usage

To see a list of commands that GenDiff offers, you can run:

```sh
  node bin/gendiff.js --help
```

### Usage signature

```sh
  gendiff [options] <filepath1> <filepath2>
```

### Usage example

```sh
  node bin/gendiff.js --format json config-1.yml config-2.yml
```

### Supported config extentions

* json
* yml
* ini

### Supported output formats

* stylish (default)
* plain
* json
