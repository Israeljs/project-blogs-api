const categoryService = require('../services/categoryService');

module.exports = {
  addCategory: async (req, res) => {
    const { name } = await categoryService.validateCategoryBody(req.body);
    const category = await categoryService.addCategory(name);
    return res.status(201).json(category);
  },
  getCategories: async (_req, res) => {
    const categories = await categoryService.getCategories();
    return res.status(200).json(categories);
  },
};
