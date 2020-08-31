import { readFileSync } from 'fs';

const readConfigFile = (configPath) => readFileSync(configPath, 'utf-8');

export default { readConfigFile };
