const mysqlClient = require('../clients/mysql');

const categoryController = {
  async get(req, res) {
    const { id } = req.params;

    try {
      const query = `SELECT * FROM eldorado.category WHERE id = "${id}"`;

      const queryResult = await mysqlClient.execute(query);

      if (queryResult.length) {
        const [category] = queryResult;

        return res.status(200).send(category);
      }

      return res.status(404).send(`Category ${id} not found`);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Something went wrong');
    }
  },

  async getAll(req, res) {
    try {
      const query = `SELECT * FROM eldorado.category`;

      const queryResult = await mysqlClient.execute(query);

      if (queryResult.length) {
        return res.status(200).send(queryResult);
      }

      return res.status(404).send('No categories found');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Something went wrong');
    }
  },

  async post(req, res) {
    try {
      const { name } = req.body;

      const query = `INSERT INTO eldorado.category (name) VALUES ("${name}")`;

      const queryResult = await mysqlClient.execute(query);

      if (queryResult.insertId) {
        return res.status(200).send({ id: queryResult.insertId });
      }

      throw new Error('Couldn\'t insert category');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Something went wrong');
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const query = `DELETE FROM eldorado.category WHERE id = "${id}"`;

      const queryResult = await mysqlClient.execute(query);

      if (queryResult.affectedRows) {
        return res.status(200).send('Sucessfully deleted');
      }

      return res.status(404).send(`Category ${id} not found`);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Something went wrong');
    }
  }
};

module.exports = categoryController;
