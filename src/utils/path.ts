import * as os from 'os';
import * as path from 'path';

export function expend(str : string) : string {
    let expendedPath = path.normalize(str);

    if (expendedPath.length <= 0) {
        return expendedPath;
    }
    
    if (expendedPath[0] === '~') {
        expendedPath = path.join(os.homedir(), expendedPath.slice(1));
    }

    for (let env of Object.keys(process.env)) {
        const to = process.env[env];
        const from = "$" + env;
        if (!to) {
            continue;
        }
        expendedPath = expendedPath.replace(from, to);
    }

    return expendedPath;
}