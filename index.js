const chalk = require("chalk");
const {
  getArchive: getLinks,
  validate,
  getAllFiles,
  stats,
  absolute,
} = require("./md-links");
const fs = require("fs");


//RECALL PROMISE
const mdlinks = (filePath, options) => {
  return new Promise((resolve) => {
  //IF FILE EXISTS
  const exists = fs.existsSync(filePath);
  if (exists === true) {
    let arrLinks = [];
    let arrayFiles = [];
    console.log(chalk.greenBright.bold("The path exists."));
    const absolutePath = absolute(filePath);
    const dirFiles = getAllFiles(absolutePath);
    //IF THERES NO FILES INSIDE THE DIRECTORY
    if (dirFiles.length === 0) {
      console.log(chalk.red.bold("Theres no files to validate"));
      return;
    } else {
      dirFiles.forEach((filename) => {
        arrLinks = filename;
      });
    }
    if (!options.validate & !options.stats) {
      console.log(chalk.black.bgWhite.bold("Links info."));
      const onlyRead = getLinks(arrLinks);
      resolve(onlyRead)
    } else if (options.validate === true) {
      console.log(chalk.black.bgWhite.bold("Links validation."));
      const validateLink = validate(arrLinks);
      resolve(validateLink)
      arrayFiles.push(validateLink);
    } else if (options.stats === true) {
      console.log(chalk.black.bgWhite.bold("Links stats."));
      const statsLink = stats(arrLinks);
      resolve(statsLink);
    }
  } else {
    console.log(chalk.red.bold("This file does not exist, try again"));
  }
})
};

module.exports = {
  mdlinks,
};
