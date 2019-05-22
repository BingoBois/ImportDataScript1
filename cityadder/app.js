const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});
connection.connect();

const fs = require('fs');
const readline = require('readline');

const fileName = 'citiesforcoords.csv';

const rl = readline.createInterface({
  input: fs.createReadStream(fileName),
  crlfDelay: Infinity
});

rl.on('line', (line, err) => {
  if (err){
    console.log(err);
  }
  try{
    const reg = /([^,]+),.*,([-]?\d*[.]\d*),([-]?\d*[.]\d*)/g
    const matches = reg.exec(line);
    const cityName = matches[1];
    const latitude = matches[2];
    const longitude = matches[3];
    
    connection.query('UPDATE dbbook.Location SET latitude = ?, longitude = ? WHERE Location.name = ?;', [latitude, longitude, cityName] ,function (error, results, fields) {
      if (error){
        console.log(error);
      }
    });

  } catch(err){
    console.log(err);
  }
});
