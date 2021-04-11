const mysqlClient = require('../clients/mysql');
const categoryModel = require('./category');

const deviceModel = {
  async getAllDevices() {
    const query = `SELECT * FROM eldorado.device`;

    const queryResult = await mysqlClient.execute(query);

    if (queryResult.length) {
      return queryResult;
    }

    const err = new Error('No devices found');
    err.code = 404;

    throw err;
  },

  async createdevice({ color, categoryId, partNumber}) {
    const query = `INSERT INTO eldorado.device (color, categoryId, partNumber)
        VALUES ("${color}", "${categoryId}", "${partNumber}")`;

    const queryResult = await mysqlClient.execute(query);

    if (queryResult.insertId) {
      return queryResult.insertId;
    }

    const err = new Error(`Couldn't insert device`);
    err.code = 500;

    throw err;
  },

  async deletedevice(id) {
    const query = `DELETE FROM eldorado.device WHERE id = "${id}"`;

    const queryResult = await mysqlClient.execute(query);

    if (!queryResult.affectedRows) {
      const err = new Error(`device ${id} not found`);
      err.code = 404;

      throw err;
    }
  }
};

module.exports = deviceModel;
