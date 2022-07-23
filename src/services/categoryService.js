const Joi = require('joi');
const { Category } = require('../database/models');

module.exports = {
  validateCategoryBody: (categoryBody) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error, value } = schema.validate(categoryBody);
    if (error) throw error;

    return value;
  },
  addCategory: async (name) => {
    const category = await Category.create({ name }); 
    return category;
  },
  getCategories: async () => {
    const categories = await Category.findAll();
    return categories;
  },
};