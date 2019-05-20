const fs = require('fs');
let spawn = require('child_process').spawn;

function grep(folder, searchTxt) {
  return new Promise((resolve, reject) => {
    let child = spawn('grep', ['-l', '-r', folder, '-e', searchTxt]);
    child.stderr.on('data', (data) => {
      reject('Error: ' + data);
    });
    child.stdout.on('data', (data) => {
      resolve(data.toString('utf8').split('\n')[0]);
    });
  });
}

module.exports = {
  grep
}
