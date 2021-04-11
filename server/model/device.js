const mysqlClient = require('../clients/mysql');
const categoryModel = require('./category');

const deviceModel = {
  async getAllDevices() {
    const query = `SELECT * FROM eldorado.device`;

    const queryResult = await mysqlClient.execute(query);

    if (queryResult.length) {
      const fetchCategories = queryResult.map(
        (dev) => categoryModel.getCategory(dev.categoryId)
        .then(category => ({
          id: dev.id,
          color: dev.color,
          category: category.name,
          partNumber: dev.partNumber,
        }))
      );

      // wait for all categories to be fetched
      const result = await Promise.all(fetchCategories);
      return result;
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
