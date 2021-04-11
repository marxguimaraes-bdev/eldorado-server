const mysqlClient = require('../clients/mysql');
const { deviceModel, categoryModel } = require('../model');

const deviceController = {
  async getAll(req, res) {
    try {
      const devices = await deviceModel.getAllDevices()

      res.status(200).send(devices);
    } catch (err) {
      console.error(err.message || err);

      return res
        .status(err.httpCode || 500)
        .send(err.message || 'Something went wrong');
    }
  },

  async post(req, res) {
    const { categoryId, color, partNumber } = req.body;

    try {
      const id = await deviceModel.createdevice({ color, categoryId, partNumber });

      return res.status(200).send({ id, color, categoryId, partNumber });
    } catch (err) {
      console.error(err.message || err);

      return res
        .status(err.httpCode || 500)
        .send(err.message || 'Something went wrong');
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      await deviceModel.deletedevice(id);

      res.status(200).send('Device deleted successfully');
    } catch (err) {
      console.error(err.message || err);

      return res
        .status(err.httpCode || 500)
        .send(err.message || 'Something went wrong');
    }
  }
};

module.exports = deviceController;
