const chalk = require('chalk');
const {getArchive, validate, getAllFiles, ext, stats}  = require('./md-links');
const path = require('path');
const fs = require('fs');

let filename = './PRUEBA/prueba.md';

//RECALL PROMISE
const mdlinks = (filePath,options) =>{

  if (path.isAbsolute(filename)===false) { //path relative to absolute
    const absLink = path.join(__dirname, filename)
    if (fs.statSync(filePath).isDirectory()){ //if its directory
      filesArray = []
      const dirFiles = getAllFiles(filename); //get files
      dirFiles.map((filename) =>
        {if (ext === '.md'){
          if(options.validate===true){
            const validateLink = validate(filename);
            filesArray.push(validateLink);
          }else{
            console.log(filesArray);
          }
          if(options.stats===true){
            const statsLink = stats(filename);
            filesArray.push(statsLink);
          }else{
              console.log(filesArray);
          }
          if(options.validate===true & options.stats===true){
            const validateLink = validate(filename);
            const statsLink = stats(filename);
            filesArray.push(statsLink, validateLink);
          }else{
            console.log(filesArray)
          }
        } else{
          console.log(chalk.magenta.bold('Theres no .md file to validate'))
        }
        }
      )
    } else{ //if its just a file with no directory
      if (ext === '.md'){
        const getFiles = getArchive(filename);
        filesArray.push(getFiles);
      } else{
        console.log(chalk.magenta.bold('Theres no .md file to validate'))
      }
  }
}

  } 
  return new Promise.all((resolve, reject) => {
    resolve();     
  });

mdlinks(filename).then(console.log)

module.exports = {
  mdlinks,
};
