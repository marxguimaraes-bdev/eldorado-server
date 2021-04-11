const mysqlClient = require('../clients/mysql');

const categoryModel = {
  async getCategory(id) {
    const query = `SELECT * FROM eldorado.category WHERE id = "${id}"`;

    const queryResult = await mysqlClient.execute(query);

    if (queryResult.length) {
      const [category] = queryResult;

      return category;
    }

    const err = new Error(`Category ${id} not found`);
    err.httpCode = 404;

    throw err;
  },

  async getAllCategories() {
    const query = `SELECT * FROM eldorado.category`;

    const queryResult = await mysqlClient.execute(query);

    if (queryResult.length) {
      return queryResult;
    }

    return [];
  },

  async createCategory(name) {
    const query = `INSERT INTO eldorado.category (name) VALUES ("${name}")`;

    const queryResult = await mysqlClient.execute(query);

    if (queryResult.insertId) {
      return queryResult.insertId;
    }

    const err = new Error(`Couldn't insert category`);
    err.httpCode = 500;

    throw err;
  },

  async deleteCategory(id) {
    const query = `DELETE FROM eldorado.category WHERE id = "${id}"`;

    const queryResult = await mysqlClient.execute(query);

    if (!queryResult.affectedRows) {
      const err = new Error(`Category ${id} not found`);
      err.httpCode = 404;

      throw err;
    }
  }
};

module.exports = categoryModel;
