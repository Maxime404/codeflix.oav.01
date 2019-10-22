const path = require('path');
const fs = require('fs');

module.exports = function jsonWriter(jsonContent, filename) {
  if (typeof jsonContent === 'object' && jsonContent !== '') {
    const path = filename.slice(0, filename.lastIndexOf('/'));
    const shortFilename = filename
      .slice(filename.lastIndexOf('/'))
      .replace(/^[\/.]+/g, '');
    const jsonData = JSON.stringify(jsonContent, null, 2);

    const date = new Date();
    const formatedDate =
      date.getFullYear() +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      ('0' + date.getDate()).slice(-2) +
      ('0' + date.getHours()).slice(-2) +
      ('0' + date.getMinutes()).slice(-2) +
      ('0' + date.getSeconds()).slice(-2);

    !fs.writeFileSync(`${path}/${shortFilename}.${formatedDate}.json`, jsonData)
      ? console.log(`${shortFilename}.${formatedDate}.json was created !`)
      : console.log(
          `Error to creat ${shortFilename}.${formatedDate}.json file...`
        );
  }
};
