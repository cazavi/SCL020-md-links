const fs = require("fs");
const path = require("path");
const axios = require("axios").default;
const chalk = require("chalk");
const cheerio = require("cheerio");
const marked = require("marked");

//GET LINKS
const getLinks = (filename) => {
  const data = fs.readFileSync(filename, "utf8");
  const archive = marked.parse(data);
  const $ = cheerio.load(archive);
  const cutLink = $("a");
  const linkToArr = [];
  cutLink.each((index, link) => {
    linkToArr.push({
      href: $(link).attr("href"),
      text: $(link).text(),
      file: filename,
    });
  });
  return linkToArr;
};
// console.log('SI ',getArchive(prueba))

//AXIOS REQ
const validate = function (arrLinks) {
  const links = getLinks(arrLinks);
  // console.log(1,filename)
  let receiveLinks = [];
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
          status: response.status,
          request: response.statusText,
        };
        return newObject;
      })
      .catch((error) => {
        // console.log(error.status_code);
        const newObject = {
          href: url,
          text: text,
          file: file,
          status: error.response.status,
          request: "Fail: " + error.response.statusText,
        };
        return newObject;
      });
    receiveLinks.push(axiosReq);
    // console.log(1,receiveLinks)
  });
  return Promise.all(receiveLinks);
};
// validate(prueba).then(console.log);

//GET STATS
const stats = function (filename) {
  const links = getLinks(filename);
  const uniqLink = links.filter((link, index, self) => {
    return self.findIndex((v) => v.href === link.href) === index;
  });
  const statsLinks = {
    total: links.length,
    unique: uniqLink.length,
  }
  return statsLinks;
};
//stats(pruebaCopy).then(console.log);

const absolute = function(filePath){
let absoluteLink = "";
  // //IF ITS A RELATIVE PATH
  if (path.isAbsolute(filePath) === false) {
    console.log(chalk.blue.bold('Converting relative path to absolute path.'))
    //path relative to absolute
    absoluteLink = path.join(__dirname, filePath);
    // console.log(absoluteLink)
    console.log(chalk.green.bold('Your path is now absolute.'))
  } else {//IF ITS ABSOLUTE PATH
    absoluteLink = filePath;
  }
  return absoluteLink
};
// console.log('SI ',absolute(prueba))

//RECURSIVE FUNCTION TO GET INTO A DIRECTORY
const getAllFiles = function (absolutePath, filesArray) {
  const files = fs.readdirSync(absolutePath, "utf-8");
  filesArray = filesArray || [];
  files.forEach((filename) => {
    if (fs.statSync(absolutePath + "/" + filename).isDirectory()) {
      console.log(chalk.magenta.bold('Extracting files from >'+ absolutePath +'< directory'))
      filesArray = getAllFiles(absolutePath + "/" + filename, filesArray);
    } else if (path.extname(filename) === '.md') {
        console.log(chalk.green.bold('Theres .md files to check at '+filename))
        // console.log(getArchive(filename))
        const arc = path.join(absolutePath, "/", filename)
        console.log(chalk.cyan.bold('Getting links from '+filename))
      filesArray.push(arc);
    }
  });
  return filesArray;
};
// console.log('SI ',getAllFiles(prueba))

module.exports = {
  getArchive: getLinks,
  validate,
  getAllFiles,
  stats,
  absolute
};

