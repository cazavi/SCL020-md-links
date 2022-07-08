const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const chalk = require('chalk');
const cheerio = require('cheerio');
const marked = require('marked');
const { env } = require('node:process');
const { argv } = require('node:process');
// const { attr } = require('cheerio/lib/api/attributes');

let readme = './README.md';
let prueba = './PRUEBA/prueba.md';

//GET ARCHIVE
const getArchive = (filename) => {
    const data = fs.readFileSync(readme, 'utf8');
    const archive = (marked.parse(getArchive));
    const $ = cheerio.load(archive);
    const cutLink = $('a');
    const linkToArr = []; 
    cutLink.each((index, link) =>{
        linkToArr.push({
            href: $(link).attr('href'),
            text: $(link).text(),
            file: filename,
        });
    });
    return linkToArr;
};

//HTTP REQUEST
const linkReq = (filename) =>{
    const links = getArchive(filename);
    const receiveLinks = [];
    links.map((route) => {
        const url = route.href;
        const description = route.text;
        const file = route.file
    }
    )
}

  //axios
const validate = function (linkToArr){
    linkToArr.map ( (link) => {
        console.log(link)
        axios.get(link.href)
            .then((response) => {
                console.log(response)
                if(path.isAbsolute(link.href)===false){
                    const absLink = path.join(__dirname, link.href)
                    return absLink
                }
            })
            .catch((error) => {
                console.log(error);
            })
    })
}
validate([{href:"https://github.com/cazavi"}])


//RECURSIVE FUNCTION
const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || []
    files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
    }
    })
    return arrayOfFiles
}

//GET EXTENSION
// function getExtension(link) {
//     const ext = path.extname(link||'').split('.');
//     return ext[ext.length - 1];
// }


//GET DIRECTORY
// function getDirectory(link){
    // const directory = fs.readdirSync();
// }
// console.log(directory)

//JOIN PATHS
// const joinPaths = path.join('/IMGS','/README')
// console.log(joinPaths)



