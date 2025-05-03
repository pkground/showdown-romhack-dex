import { execSync } from "child_process";
import { argv, exitCode } from "process";
import config from "../data/config.json";
import * as fs from "fs";

let dest = argv[2];

if (!fs.existsSync(`./${dest}`)) {
    fs.mkdirSync(`./${dest}`, { recursive: true });
}

execSync(`rm -rf ./${dest}/*`);

for (let folder of ["images"]) {
    execSync(`cp -rf ${folder} ./${dest}/`);
}

execSync(`echo $PWD`);
execSync(`npx parcel build --public-url ${config.baseurl} ./index.html`);
execSync(`cp ./${dest}/index.html ./${dest}/404.html`);