const fs = require('fs');
const path = require('path');
const extract = require('extract-zip');
const { grep } = require('./runScript');
const parseString = require('xml2js').parseString;

const rootDir = path.resolve(__dirname);

// Cities object for comparisons



// Read list of zip files
(async () => {
  /// mnt/c/Users/vikto/Desktop/4saftig/newfolder/cache/epub/566/pg566.rdf
  const rdfToSearch = await grep(`${rootDir}/newfolder/cache/epub`, `1jcfs10.txt`);
  const rdfContent = fs.readFileSync(rdfToSearch).toString('utf8');
  
  const regTitle = /<dcterms:title>(.*)<\/dcterms:title>/g;
  const regAuthors = /<pgterms:name>(.*)<\/pgterms:name>/g;

  const title = regTitle.exec(rdfContent)[1];

  const authors = rdfContent.match(regAuthors);
  let authorArr = [];
  for (let index = 0; index < authors.length; index++) {
    parseString(authors[index], function (err, result) {
      authorArr.push(result['pgterms:name']);
    });
  }
  
  console.log(title);
  console.log(authorArr);

  // Create object, and map every city name as keys (just ignore duplicates)

  // Search entire content of fileName, compare every word to cityNames. If there is a match write it down.

  // Spaces åh nej
})()




// const listOfZips = fs.readdirSync('./zipfiles');
// listOfZips.forEach(async (f) => {
//   const fileName = f.replace('.zip', '');
//   await extractFile(fileName);
//   const rdfToSearch = await grep(`${rootDir}/newfolder/cache/epub`, `${fileName}.txt`);

//   // search rdf files folder (newfolder/cache/epub) for fileName.txt
//   const rdfContent = fs.readFileSync(rdfToSearch).toString('utf8');

//   // Extract title
//   // Extract authors

//   // Get all mentions of all cities (50000.txt)
// });

async function extractFile(fileName) {
  extract(`./zipfiles/${fileName}.zip`, {dir: rootDir}, (err) => {
    if(err) throw err;

    return true;
  });
}
