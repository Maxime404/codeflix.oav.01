const path = require('path');
const fs = require('fs');
const parseIni = require('./parseIni.js');
const parseEnv = require("./parseEnv");
const jsonWriter = require("./jsonWriter.js");

//process.argv get an array composed of 2 parts then the argument(s)
//So, process.argv.slice(2) get the third part, argument(s)
const args = process.argv.slice(2);

//Check if there is one argument, else exit
if (args.length !== 1) {
    console.log(`usage: node ${__filename.split('/').pop()} <CONFIG_FILENAME>`);
    process.exit(0);
}

const filename = args[0];

//Check if filname exist
if (!fs.existsSync(filename)) {
    console.log(`The file : ${filename} does not exist.`)
    process.exit(0);
}

//Get content of filename 
const content = fs.readFileSync(filename, 'utf-8');
//Get extension of filename
//const extension = path.extname(filename);
const extension = filename.split('.').pop();

let jsonContent = '';
(extension === 'ini')
    ? jsonContent = parseIni(content)
    : (extension === 'env') ? jsonContent = parseEnv(content)
        : console.log(`The file's extension need to be .env or .ini, the current extension is .${extension}`);

jsonWriter(jsonContent, filename);

process.exit(0);
