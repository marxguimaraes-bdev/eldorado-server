const { categoryModel } = require('../model');

const categoryController = {
  async getAll(req, res) {
    try {
      const categories = await categoryModel.getAllCategories();

      res.status(200).send(categories);
    } catch (err) {
      console.error(err.message || err);

      return res
        .status(err.httpCode || 500)
        .send(err.message || 'Something went wrong');
    }
  },

  async post(req, res) {
    const { name } = req.body;

    try {
      const id = await categoryModel.createCategory(name);

      return res.status(200).send({ id, name });
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
      await categoryModel.deleteCategory(id);

      res.status(200).send('Category deleted successfully');
    } catch (err) {
      console.error(err.message || err);

      if (err.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).send(`This category can't be deleted`);
      }

      return res
        .status(err.httpCode || 500)
        .send(err.message || 'Something went wrong');
    }
  }
};

module.exports = categoryController;
