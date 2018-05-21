const fs = require('fs');
const dir = __dirname;
let dirFiles = [];

fs.readdir(dir, (error, files)=> {
    dirFiles = files.map(file=> file).filter(file=> file.endsWith('.html'));
    console.log(dirFiles)
});
