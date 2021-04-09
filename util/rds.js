const mysql = require('mysql');
const { rds: config } = require('../config');

const rdsConnection = mysql.createConnection(config);

rdsConnection.connect();

const queryCallback = (error, results, fields) => {
  if (error) throw error;

  console.log('Query successfully executed');
};

rdsConnection.query('DROP DATABASE IF EXISTS eldorado', queryCallback);

rdsConnection.query('CREATE DATABASE IF NOT EXISTS eldorado', queryCallback);

rdsConnection.query(`CREATE TABLE IF NOT EXISTS eldorado.category (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(128)
);`, queryCallback);

rdsConnection.query(`CREATE TABLE IF NOT EXISTS eldorado.device (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  categoryId INTEGER,
  color VARCHAR(16),
  partNumber INTEGER,
  CONSTRAINT FK_categoryId FOREIGN KEY (categoryId)
  REFERENCES eldorado.category(id)
);`, queryCallback);

rdsConnection.end();
