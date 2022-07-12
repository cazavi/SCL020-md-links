const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const chalk = require('chalk');
const cheerio = require('cheerio');
const marked = require('marked');
const { env } = require('node:process');
const { argv } = require('node:process');

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
    const axiosReq = axios.get(url)
    .then((response) => {
        // console.log(response.href)
        const newObject = {
        href: url,
        text: text,
        file: file,
        status:response.status,
        request:response.statusText
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
        request: 'Fail: '+ error.response.statusText
        }
        return newObject
    })   
    receiveLinks.push(axiosReq)
    // console.log(1,receiveLinks)                
    })
    return Promise.all(receiveLinks)
}
// validate(prueba).then(console.log)

//GET STATS
const stats = function(filename){
    const links = getArchive(filename);
    const activeLinks = [];
    const brokenLinks = [];
    for (let i = 0; i < links.length; i++) {
        let url = links[i]; 
        axios.get(url.href)
        .then((response) => {
            if (response.status === 200) {
            activeLinks.push(response.url)
            } else {
            brokenLinks.push(response.url)
            }
        }).catch((err) => {
            console.log(chalk.red(`error 1: ${err}`));
        });
    }
}
stats(prueba)

//RECURSIVE FUNCTION TO GET INTO A DIRECTORY
// const getAllFiles = function(dirPath, filesArray) {
//     const files = fs.readdirSync(dirPath, 'utf-8')
//     filesArray = filesArray || []
//     files.map((filename) => {
//     if (fs.statSync(dirPath + "/" + filename).isDirectory()) {
//         filesArray = getAllFiles(dirPath + "/" + filename, filesArray)
//     } else {
//         filesArray.push(path.join(__dirname, dirPath, "/", filename))
//     }
//     })
//     return filesArray
// }

//GET EXTENSION
const ext = path.extname(prueba||'').split('.');

module.exports = {
    getArchive,
    validate,
    getAllFiles,
    ext,
    stats
};


//JOIN PATHS
// const joinPaths = path.join('/IMGS','/README')
// console.log(joinPaths)