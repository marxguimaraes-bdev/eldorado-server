const mysqlClient = require('../clients/mysql');

const deviceController = {
  async get(req, res) {
    const { id } = req.params;

    try {
      const query = `SELECT * FROM eldorado.device WHERE id = "${id}"`;

      const queryResult = await mysqlClient.execute(query);

      if (queryResult.length) {
        const [device] = queryResult;

        return res.status(200).send(device);
      }

      return res.status(404).send(`Device ${id} not found`);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Something went wrong');
    }
  },

  async getAll(req, res) {
    try {
      const query = `SELECT * FROM eldorado.device`;

      const queryResult = await mysqlClient.execute(query);

      if (queryResult.length) {
        return res.status(200).send(queryResult);
      }

      return res.status(404).send('No devices found');
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Something went wrong');
    }
  },

  async post(req, res) {
    try {
      const { categoryId, color, partNumber } = req.body;

      const query = `INSERT INTO eldorado.device (categoryId, color, partNumber)
        VALUES ("${categoryId}", "${color}", "${partNumber}")`;

      const queryResult = await mysqlClient.execute(query);

      if (queryResult.insertId) {
        return res.status(200).send({ id: queryResult.insertId });
      }

      throw new Error('Couldn\'t insert device');
    } catch (err) {
      console.error(err.message);

      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).send('The categoryId passed does\'nt exist');
      }

      return res.status(500).send('Something went wrong');
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const query = `DELETE FROM eldorado.device WHERE id = "${id}"`;

      const queryResult = await mysqlClient.execute(query);

      if (queryResult.affectedRows) {
        return res.status(200).send('Sucessfully deleted');
      }

      return res.status(404).send(`device ${id} not found`);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Something went wrong');
    }
  }
};

module.exports = deviceController;
