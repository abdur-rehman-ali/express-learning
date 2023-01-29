import Post from '../models/post.js'

import asyncHandler from '../middlewares/asyncHandler.js'

class PostsController {
  static getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
    res.status(200).json({ status: 'success', count: posts.length, data: posts })
  })

  static getPost = asyncHandler(async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ status: 'error', message: `No post exist with id: ${id}` })
    }
    res.status(200).json({ status: 'success', data: post })
  })

  static createPost = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const post = await Post.create({ title, description })
    res.status(201).json({ status: 'success', message: 'Post created successfully!!!', data: post })
  })

  static editPost = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    const post = await Post.findByIdAndUpdate(id, { title, description }, { runValidators: true, new: true })
    if (!post) {
      return res.status(404).json({ status: 'error', message: `No post exist with id: ${id}` })
    }
    res.status(200).json({ status: 'success', message: 'Post updated successfully!!!', data: post })
  })

  static deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params
    const post = await Post.findByIdAndDelete(id)
    if (!post) {
      return res.status(404).json({ status: 'error', message: `No post exist with id: ${id}` })
    }
    res.status(200).json({ status: 'success', message: 'Post deleted successfully!!!' })
  })
}

export default PostsController