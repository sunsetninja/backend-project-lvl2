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

### Usage examples

```sh
  node bin/gendiff.js --format json config-1.yml config-2.yml
```

## Supported config extentions

* json
* yml
* ini

## Supported output formats

* stylish (default)
* plain
* json

## Examples

### Stylish output

[![asciicast](https://asciinema.org/a/LnOPuEFZQLHsMSOuB5aJ1xLOe.svg)](https://asciinema.org/a/4vydIU5kuL5WviAIukwCIRf3C)

### Plain output

[![asciicast](https://asciinema.org/a/etSPzOMj2JSi4TQ9XuxGolLOw.svg)](https://asciinema.org/a/etSPzOMj2JSi4TQ9XuxGolLOw)

### JSON output

[![asciicast](https://asciinema.org/a/LnOPuEFZQLHsMSOuB5aJ1xLOe.svg)](https://asciinema.org/a/LnOPuEFZQLHsMSOuB5aJ1xLOe)