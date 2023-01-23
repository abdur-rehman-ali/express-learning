import express from 'express'
import PostsController from '../controllers/postsController.js'
const router = express.Router()

router.get('/', PostsController.getPosts)
router.get('/:id', PostsController.getPost)
router.post('/', PostsController.createPost)
router.patch('/:id', PostsController.editPost)
router.put('/:id', PostsController.editPost)
router.delete('/:id', PostsController.deletePost)

export default router