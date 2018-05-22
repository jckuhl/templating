const fs = require('fs');

//pretend this comes from .template.json
const exclude = ['test.html', 'testbkup.html'];

const dirFiles = fs.readdirSync(__dirname).filter(file=> file.endsWith('.html') && !exclude.includes(file));
const templateFiles = dirFiles.filter(file=> file.endsWith(".template.html"));
const htmlFiles = dirFiles.filter(file=> file.endsWith('.html') && !templateFiles.includes(file));

console.log(dirFiles);

function generateTemplateObjects() {
    const templates = [];
    templateFiles.forEach(file=> {
        templates.push({
            content: file,
            name: file.split('.')[0]
        });
    });
    return templates;
}

const templates = generateTemplateObjects();

function findTemplate(file, temp) {
    const tagLength = `<!--<template name="${temp.name}">-->`.length;
    const start = file.content.indexOf(`<!--<template name="${temp.name}">-->`);
    const end = file.content.indexOf(`<!--</template name="${temp.name}">-->`);
    if(start == -1 || end == -1) {
        console.log(`Improper or missing template tag for ${temp.name} in ${file.name}.\nAdd to .template.json "exclude" to exclude this file`);
        return [null, null];
    }
    return [start, end];
}

function updateHTML() {
    templates.forEach( temp=> {
        htmlFiles.forEach(html=> {
            const file = {};
            file.name = html;
            file.content = fs.readFileSync(html, 'utf-8');
            [start, end] = findTemplate(file, temp);
            if(start && end) {
                file.content = file.content.slice(0, start) + fs.readFileSync(temp.content) + file.content.slice(end);
                fs.writeFileSync(html,file.content);
            }
        });
    });
}

//updateHTML();