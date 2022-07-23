const express = require('express');
const authCheck = require('../middlewares/authCheck');
const blogPostController = require('../controllers/blogPostController');

const router = express.Router();

router.post('/', authCheck, blogPostController.addPost);
router.get('/search', authCheck, blogPostController.searchPosts);
router.get('/', authCheck, blogPostController.getPosts);
router.get('/:id', authCheck, blogPostController.getPostById);
router.put('/:id', authCheck, blogPostController.updatePost);
router.delete('/:id', authCheck, blogPostController.removePost);

module.exports = router;