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
let images = './IMGS'
let nm = './node_modules'

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
    return linkObjToArr;
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
axios.get(link)
    .then((response) => {
        if(path.isAbsolute(link)===false){
            const absLink = path.join(__dirname, link)
        return absLink
    }
    console.log(response);
    })
    .catch((error) => {

    console.log(error);
    })
    .then(){
    };

//GET EXTENSION
function getExtension(readme) {
    const ext = path.extname(readme||'').split('.');
    return ext[ext.length - 1];
}


//GET DIRECTORY
// function getDirectory(readme){
    const directory = fs.readdirSync(nm);
// }
// console.log(directory)

//JOIN PATHS
const joinPaths = path.join('/IMGS','/README')
// console.log(joinPaths)



