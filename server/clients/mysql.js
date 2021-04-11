const mysql = require('mysql');
const { rds: config } = require('../../config');

const pool = mysql.createPool(config);

const mysqlClient = {
  execute: (query) => {
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });
  },
};

module.exports = mysqlClient;
