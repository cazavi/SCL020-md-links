const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const chalk = require('chalk');
const cheerio = require('cheerio');
const marked = require('marked');
const { env } = require('node:process');
const { argv } = require('node:process');
const { receiveMessageOnPort } = require('worker_threads');
const { ok } = require('assert');
// const { attr } = require('cheerio/lib/api/attributes');

let readme = './README.md';
let prueba = './PRUEBA/prueba.md';

//GET ARCHIVE
const getArchive = (filename) => {
    const data = fs.readFileSync(filename, 'utf8');
    const archive = (marked.parse(data));
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

//AXIOS REQ
const validate = function (filename){
    const links = getArchive(filename);
    // console.log(1,filename)
    const receiveLinks = [];
    links.map((link) => {
        const url = link.href;
        const text = link.text;
        const file = link.file;
        // let status = link.status;
        // let ok = link.statusText
    // console.log(typeof url)        
    const axiosReq = axios.get(url)
    .then((response) => {
        // console.log(response.href)
        const newObject = {
        href: url,
        text: text,
        file: file,
        status:response.status,
        ok:response.statusText
        }
        return newObject
    })
    .catch((error) => {
        // console.log(error.status_code);
        const newObject = {
        href: url,
        text: text,
        file: file,
        status:error.response.status,
        ok: 'Fail'
        }
        return newObject
    })   
    receiveLinks.push(axiosReq)
    // console.log(1,receiveLinks)                
    })
    return Promise.all(receiveLinks)
}
validate(prueba).then(console.log)

//RECURSIVE FUNCTION TO GET INTO A DIRECTORY
const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || []
    files.map((file) => {
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