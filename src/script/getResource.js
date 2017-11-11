const resource = require('../resources/config');
const Promise = require("bluebird");

module.exports = (route) => {
  return new Promise((resolve, reject) => {
    if (resource[route]) {
      $.ajax({
        url: resource[route].url,
        success: (data) => {
          resolve(data)
        }
      });
    } else {
      resolve();
    }
  });
}
