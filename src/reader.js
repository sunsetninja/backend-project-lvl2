import { readFileSync } from 'fs';
import path from 'path';

function readConfigFile(configPath) {
  return readFileSync(path.resolve(configPath), 'utf-8');
}

export default { readConfigFile };
