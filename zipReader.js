const fs = require('fs');
const path = require('path');
const extract = require('extract-zip');
const { grep } = require('./runScript');
const parseString = require('xml2js').parseString;

const rootDir = path.resolve(__dirname);
const notParsed = [];
let citiesArr = [];
let citiesInBooks = {};

const cities = fs.readFileSync('./citiesnames.csv').toString('utf8').replace("\r", "\n");
const citySplit = cities.split("\n");
for (let index = 0; index < citySplit.length; index++) {
	const element = citySplit[index];
	citiesArr.push(element.toLowerCase());
}

function parseFolder() {
	console.log("Started parseFolder()")
	const listOfZips = fs.readdirSync('./smallZip');
	listOfZips.forEach( async (f, index) => {
		const fileName = f.replace('.zip', '');
		const parsed = parseInt(fileName);
		if (parsed === NaN) {
			notParsed.push(fileName)
			return;
		}
		console.log("Starting extractFile()")
		await extractFile(fileName);
		console.log("Finished extractFile()")
		const rdfToSearch = (`${rootDir}/rdf-files/cache/epub/${parsed}/pg${parsed}.rdf`);

		// search rdf files folder (newfolder/cache/epub) for fileName.txt
		const rdfContent = fs.readFileSync(rdfToSearch).toString('utf8');

		// Extract title
		// Extract authors
		const regTitle = /:title>(.[^<]*)<\//gms;
		const regAuthors = /:name>(.[^<]*)<\//gms;

		const title = regTitle.exec(rdfContent)[1].replace("\n", " ");

		const authors = rdfContent.match(regAuthors);
		let authorArr = [];
		if(authors){
			if(authors.length > 0){
				for (let index = 0; index < authors.length; index++) {
					const author = authors[index];
					if(author.includes("\n")){
						continue;
					}
					const sut = new RegExp(':name>(.[^<]*)<\/', 'i');
					authorArr.push(sut.exec(author)[1]);
				}
			}
		}
		const history = fs.readFileSync(`./${fileName}.txt`).toString('utf8').toLowerCase();
		for (let index = 0; index < citiesArr.length; index++) {
			const cityName = citiesArr[index];
			const result = history.match(new RegExp(`(?<=\\s|^)${cityName}(?=\\s|$|\\!|\\?|\\.|\\,)`, 'gi'))
			if(result){
				if(!citiesInBooks[title]){
					citiesInBooks[title] = [];
				}
				citiesInBooks[title].push(cityName);
			};
		}
		console.log(citiesInBooks)
	});
}


// Read list of zip files
// (async () => {
// 	/// mnt/c/Users/vikto/Desktop/4saftig/newfolder/cache/epub/566/pg566.rdf
// 	const rdfToSearch = await grep(`${rootDir}/rdf-files/cache/epub`, `1jcfs10.txt`);
// 	const rdfContent = fs.readFileSync(rdfToSearch).toString('utf8');

// 	const regTitle = /<dcterms:title>(.*)<\/dcterms:title>/g;
// 	const regAuthors = /<pgterms:name>(.*)<\/pgterms:name>/g;

// 	const title = regTitle.exec(rdfContent)[1];

// 	const authors = rdfContent.match(regAuthors);
// 	let authorArr = [];
// 	for (let index = 0; index < authors.length; index++) {
// 		parseString(authors[index], function (err, result) {
// 			authorArr.push(result['pgterms:name']);
// 		});
// 	}

// 	console.log(title);
// 	console.log(authorArr);

// 	// Create object, and map every city name as keys (just ignore duplicates)

// 	// Search entire content of fileName, compare every word to cityNames. If there is a match write it down.

// 	// Spaces åh nej
// })()


parseFolder();
//console.log(citiesInBooks);

// 

async function extractFile(fileName) {
	extract(`./smallZip/${fileName}.zip`, { dir: rootDir }, (err) => {
		if (err) throw err;

		return true;
	});
}
