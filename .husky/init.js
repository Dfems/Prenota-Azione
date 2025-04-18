// .husky/init.js
import { mkdirSync, writeFileSync, chmodSync } from 'fs';

mkdirSync('.husky', { recursive: true });

writeFileSync('.husky/pre-commit', `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
`);

chmodSync('.husky/pre-commit', 0o755);
