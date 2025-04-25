import { execSync } from "child_process";
import { argv, exitCode } from "process";
import config from "../data/config.json"

let dest = argv[2];

execSync(`mkdir -p ./${dest}`);
execSync(`rm -rf ./${dest}/*`);

for (let folder of ["images"]) {
  execSync(`cp -rf ${folder} ./${dest}/`);
}
execSync(`echo $PWD`)
execSync(`npx parcel build --public-url ${config.baseurl} ./index.html`)
execSync(`cp ./${dest}/index.html ./${dest}/404.html`);
