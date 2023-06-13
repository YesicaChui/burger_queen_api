/* import path from 'path';
const __dirname = path.resolve(process.cwd());
export default __dirname */

import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __filename= fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default __dirname