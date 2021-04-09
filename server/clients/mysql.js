const mysql = require('mysql');
const { rds: config } = require('../../config');

const connection = mysql.createConnection(config);
connection.connect();

const mysqlClient = {
  execute: (query) => {
    return new Promise((resolve, reject) => {

      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    })    
  },
};

module.exports = mysqlClient;
