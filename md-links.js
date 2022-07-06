const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const chalk = require('chalk');
const cheerio = require('cheerio');
const marked = require('marked');
const { env } = require('node:process');
const { argv } = require('node:process');

let readme = './README.md';
let images = './IMGS'
let nm = './node_modules'

//marked call
// document.getElementById('content').innerHTML =
// marked.parse('# Marked in the browser\n\nRendered by **marked**.');

// //cheerio
// const $ = cheerio.load('<h2 class="title">Hello world</h2>');

// const mark = marked.parse(readme)
// console.log(mark)

// const $ = cheerio.load(readme)
// console.log($)

//GET ARCHIVE
const getArchive = fs.readFileSync(readme, 'utf8');
// archive.map(callback(){}
    // (error, data)
    // if (error) throw error;
    // console.log("El contenido es: ", data);
// });

const mark = (marked.parse(getArchive))

const $ = cheerio.load(mark)
// console.log($)

//GET EXTENSION
function getExtension(readme) {
    const ext = path.extname(readme||'').split('.');
    return ext[ext.length - 1];
}
// console.log(getExtension(readme))

//GET DIRECTORY
// function getDirectory(readme){
    const directory = fs.readdirSync(nm);
// }
// console.log(directory)

//JOIN PATHS
const joinPaths = path.join('/IMGS','/README')
// console.log(joinPaths)



