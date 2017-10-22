const resource = require('../resources/config');


module.exports = (route) => {
  return new Promise((resolve, reject) => {
    if (resource[route]) {
      $.ajax({
        url: resource[route].url,
        success: (data) => {
          resolve(data)
        },
        error: (error) => {
          reject(error);
        }
      });
    } else {
      resolve();
    }
  });
}
