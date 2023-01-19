#!/usr/bin/env node

import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';

let { dir, out, excludes } = commandLineArgs([
    { name: 'dir', type: String, defaultValue: 'dist' },
    { name: 'out', type: String, defaultValue: 'dist/index.js' },
    { name: 'excludes', type: String, defaultValue: '.git,node_modules' }
]);

excludes = excludes?.split(',') || [];

(async () => {

    async function getFiles(dir) {
        const dirents = await fs.readdir(dir, { withFileTypes: true });
        const files = await Promise.all(dirents.map((dirent) => {
          const res = path.resolve(dir, dirent.name);
          return dirent.isDirectory() ? getFiles(res) : res;
        }));
        return Array.prototype.concat(...files);
    }
    let contents = (await getFiles(dir)).filter(c => path.basename(c).replace('.ts', '').replace('.js', '').toLowerCase() === 'index');
    let exporter = '';
    let relativeTo = path.dirname(path.resolve(out));

    contents = contents.filter(c => !excludes.find(e => c.includes(e)));

    for await (const c of contents) {
        exporter += `\r\nexport * from '${c.replace(relativeTo, '.').replaceAll('\\','/').replace('.ts','.js')}';`;
    }

    const outDir = path.dirname(out);
    if (!existsSync(outDir)) {
        await fs.mkdir(outDir, { recursive: true });
    }
    await fs.writeFile(out, exporter);

    console.log(chalk.green(`Generated exports at '${out}'`));
})()