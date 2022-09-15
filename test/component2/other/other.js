import * as fs from 'fs/promises';

export class Other {
    doOther() {
        fs.readdir('.');
        return 1;
    }
} 