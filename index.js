module.exports = () => {
  // ...
};

const axios = require('axios').default;
const chalk = require('chalk');

//recall promise
function someAsyncFunction() {
  return new Promise((resolve, reject) => {
    if (somethingWasSuccessful) {
        resolve();     
    } else {
        reject()
    }
  });
}

//consuming the promise
someAsyncFunction
  .then(runAFunctionIfItResolved(withTheResolvedValue))
  .catch(orARunAFunctionIfItRejected(withTheRejectedValue));
