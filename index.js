module.exports = () => {
  // ...
};

const axios = require('axios').default;
const chalk = require('chalk');
const getArchive = require('getArchive')

//RECALL PROMISE
const mdlinks = ()
function someAsyncFunction() {
  return new Promise((resolve, reject) => {
    if (somethingWasSuccessful) {
        resolve();     
    } else {
        reject()
    }
  });
}

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