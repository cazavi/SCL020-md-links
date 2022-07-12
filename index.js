const chalk = require("chalk");
const { getArchive, validate, getAllFiles, ext, stats } = require("./md-links");
const path = require("path");
const fs = require("fs");

let fileTest = "./deleteNicolaz";

//RECALL PROMISE
const mdlinks = (filePath, options) => {
  let absoluteLink = "";

  if (path.isAbsolute(filePath) === false) {
    //path relative to absolute
    absoluteLink = path.join(__dirname, filePath);
  } else {
    absoluteLink = filePath;
  }

  if (fs.statSync(absoluteLink).isDirectory()) {
    //if its directory
    filesArray = [];
    const dirFiles = getAllFiles(absoluteLink); //get files
    dirFiles.map((filename) => {
      extension = path.extname(filename || "");
      if (extension === ".md") {
        if(!options.validate & !options.stats){
          console.log(filename)
        }
        if (options.validate === true) {
          const validateLink = validate(filename);
          filesArray.push(validateLink);
        } else if (options.stats === true) {
          const statsLink = stats(filename);
          filesArray.push(statsLink);
        } else if ((options.validate === true) & (options.stats === true)) {
          const validateLink = validate(filename);
          const statsLink = stats(filename);
          filesArray.push(statsLink, validateLink);
        }
      } else {
        console.log(chalk.magenta.bold("1 Theres no .md file to validate"));
      }
    });
  } else {
    //if its just a file with no directory
    if (ext === ".md") {
      const getFiles = getArchive(absoluteLink);
      filesArray.push(getFiles);
    } else {
      console.log(chalk.magenta.bold("2 Theres no .md file to validate"));
    }
  }
};

// return new Promise.all((resolve, reject) => {
//   resolve();
// });

mdlinks(fileTest, { validate: false, stats: false });

module.exports = {
  mdlinks,
};
