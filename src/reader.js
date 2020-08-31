import { readFileSync } from 'fs';

function readConfigFile(configPath) {
  return readFileSync(configPath, 'utf-8');
}

export default { readConfigFile };
