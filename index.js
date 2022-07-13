const chalk = require("chalk");
const { getArchive, validate, getAllFiles, stats } = require("./md-links");
const path = require("path");
const fs = require("fs");

let fileTest = './PRUEBA';

//RECALL PROMISE
const mdlinks = (filePath, options) => {
  const exists = fs.existsSync(filePath)
  console.log(exists)
  //IF FILE EXISTS
  if(exists===true){
    console.log('the path exist')

  let absoluteLink = "";
  //IF ITS A RELATIVE PATH
  if (path.isAbsolute(filePath) === false) {
    console.log('path is relative')
    //path relative to absolute
    absoluteLink = path.join(__dirname, filePath);
    console.log(absoluteLink)
    console.log('path is absolute now')
  } else {//IF ITS ABSOLUTE PATH
    absoluteLink = filePath;
  }
  const ext = path.extname(absoluteLink) === '.md'
  console.log(ext)
  //IF THERES NO .MD EXTENSION-IS A DIRECTORY
  if (!ext) {
    const dirFiles = getAllFiles(absoluteLink);
    console.log('AQUI',dirFiles) //get files
    console.log('getting directory files')
    //IF THERES NO FILES INSIDE THE DIRECTORY 
    if(dirFiles.length===0){
      console.log('Theres no files to validate')
      return

    }else{
    filesArray = [];
    
    dirFiles.map((filename) => {
    console.log(filename)

      if (path.extname(filename) === '.md') {
        console.log('theres .md files to validate')
        console.log(getArchive(filename))
        const getFiles = getArchive(filename);
        
        filesArray.push(getFiles);
      }
    })
    mdlinks(filesArray)
    }
  }

  if(!options.validate & !options.stats){
    console.log(1,getArchive(absoluteLink))

  } else if (options.validate === true) {
      console.log('Validating link')
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
  }else{
    console.log(chalk.red.bold('This file does not exist, try again'))
  }

// return new Promise.all((resolve, reject) => {
//   resolve();
// });
};
mdlinks(fileTest, { validate: false, stats: false });

module.exports = {
  mdlinks,
};
