const fs = require("fs");
const path = require("path");
const axios = require("axios").default;
const chalk = require("chalk");
const cheerio = require("cheerio");
const marked = require("marked");

// let prueba = "./PRUEBA/prueba.md";
// const pruebaCopy = "./PRUEBA/prueba copy.md";

//GET ARCHIVE
const getArchive = (filename) => {
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

//AXIOS REQ
const validate = function (filename) {
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
//validate(prueba).then(console.log);

//GET STATS
const stats = function (filename) {
  const links = getArchive(filename);
  let receiveLinks = [];
  links.map((link) => {
    const url = link.href;
    const axiosReq = axios
      .get(url)
      .then((response) => {
        const stat = response.status;
        const newObject = {
          links: stat,
        };
        return newObject;
      })
      .catch((err) => {
        console.log(err);
      });
    receiveLinks.push(axiosReq);
  });
  return Promise.all(receiveLinks);
};
//stats(pruebaCopy).then(console.log);

//RECURSIVE FUNCTION TO GET INTO A DIRECTORY
const getAllFiles = function (dirPath, filesArray) {
  const files = fs.readdirSync(dirPath, "utf-8");
  filesArray = filesArray || [];
  files.map((filename) => {
    if (fs.statSync(dirPath + "/" + filename).isDirectory()) {
      filesArray = getAllFiles(dirPath + "/" + filename, filesArray);
    } else {
      filesArray.push(path.join(__dirname, dirPath, "/", filename));
    }
  });
  return filesArray;
};

module.exports = {
  getArchive,
  validate,
  getAllFiles,
  stats,
};

//JOIN PATHS
// const joinPaths = path.join('/IMGS','/README')
// console.log(joinPaths)
