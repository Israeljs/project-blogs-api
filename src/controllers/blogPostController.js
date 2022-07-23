const blogPostService = require('../services/blogPostService');

module.exports = {
  addPost: async (req, res) => {
    const { title, content, categoryIds } = blogPostService.validatePostBody(req.body);
    const userId = req.user.id;
    await blogPostService.validateCategory(categoryIds);
    const post = await blogPostService.addPost(title, content, userId, categoryIds);
    return res.status(201).json(post);
  },
  getPosts: async (_req, res) => {
    const posts = await blogPostService.getPosts();
    return res.status(200).json(posts);
  },
  getPostById: async (req, res) => {
    const { id } = req.params;
    const post = await blogPostService.getPostById(id);
    return res.status(200).json(post);
  },
  updatePost: async (req, res) => {
    const { title, content } = blogPostService.validateUpdatePostBody(req.body);
    const { id } = req.params;
    const { email } = req.user;
    await blogPostService.checkPostUserAuth(id, email);
    await blogPostService.updatePost(id, title, content);
    const post = await blogPostService.getPostById(id);
    return res.status(200).json(post);
  },
  removePost: async (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    await blogPostService.getPostById(id);
    await blogPostService.checkPostUserAuth(id, email);
    await blogPostService.removePost(id);
    return res.status(204).end();
  },
  searchPosts: async (req, res) => {
    const { q } = req.query;
    const posts = await blogPostService.searchPosts(q);
    return res.status(200).json(posts);
  },
};
