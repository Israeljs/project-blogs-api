const { Op } = require('sequelize');
const {
  BlogPost,
  sequelize,
  PostCategory,
  Category,
  User,
 } = require('../database/models');

module.exports = {
  validatePostBody: ({ title, content, categoryIds }) => {
    if (!title || !content || !categoryIds) {
      const error = new Error('Some required fields are missing');
      error.name = 'ValidationError';
      throw error;
    }
    return { title, content, categoryIds };
  },
  validateUpdatePostBody: ({ title, content }) => {
    if (!title || !content) {
      const error = new Error('Some required fields are missing');
      error.name = 'ValidationError';
      throw error;
    }
    return { title, content };
  },
  validateCategory: async (categoryIds) => {
    const category = await Category.findAndCountAll({
      where: {
        id: categoryIds,
      },
    });
      // where: { id: { [Op.in]: categoryIds } } });

    if (category.count < 1) {
      const error = new Error('"categoryIds" not found');
      error.name = 'ValidationError';
      throw error;
    }
    return category;
  },
  addPost: async (title, content, userId, categoryIds) => {
    const result = sequelize.transaction(async (t) => { 
      const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
  
      const postAndCategoryIds = categoryIds
      .map((categoryId) => ({ postId: blogPost.id, categoryId }));
  
      await PostCategory.bulkCreate(postAndCategoryIds, { transaction: t });
  
      return blogPost;
    });

    return result;
  },
  getPosts: async () => {
    const blogPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    // 'user' e 'categories' foram os nomes dados nas associações
    return blogPosts;    
  },
  getPostById: async (id) => {
    const blogPost = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!blogPost) {
      const error = new Error('Post does not exist');
      error.name = 'NotFoundError';
      throw error;
    }    
    return blogPost;    
  },
  checkPostUserAuth: async (id, email) => {
    const hasPosts = await BlogPost.findOne({
      where: { id },
      include: {
        model: User,
        as: 'user',
        where: { email },
      },
    });
    if (!hasPosts) {
      const error = new Error('Unauthorized user');
      error.name = 'UnauthorizedError';
      throw error;
    }    
    return true;    
  },
  updatePost: async (id, title, content) => {
    const [result] = await BlogPost.update({ title, content }, {
      where: { id },
    });
    return result;
  },
  removePost: async (id) => {
    const result = await BlogPost.destroy({ where: { id } });
    console.log(result, 'testtesttesttesttees');
    return result;
  },
  searchPosts: async (search) => {
    const post = await BlogPost.findAll({
      where: { 
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } }, 
          { content: { [Op.like]: `%${search}%` } },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return post;
  },  
};
