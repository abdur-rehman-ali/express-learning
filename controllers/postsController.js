import Post from '../models/post.js'

class PostsController {
  static getPosts = async (req, res) => {
    try {
      const posts = await Post.find()
      res.status(200).json({ status: 'success', data: posts })
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
    }
  }

  static getPost = async (req, res) => {
    try {
      const { id } = req.params
      const post = await Post.findById(id)
      if (!post) {
        return res.status(404).json({ status: 'error', message: `No post exist with id: ${id}` })
      }
      res.status(200).json({ status: 'success', data: post })
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
    }
  }

  static createPost = async (req, res) => {
    try {
      const { title, description } = req.body
      const post = await Post.create({ title, description })
      res.status(201).json({ status: 'success', message: 'Post created successfully!!!', data: post })
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
    }
  }

  static editPost = async (req, res) => {
    try {
      const { id } = req.params
      const { title, description } = req.body
      const post = await Post.findByIdAndUpdate(id, { title, description }, { runValidators: true, new: true })
      if (!post) {
        return res.status(404).json({ status: 'error', message: `No post exist with id: ${id}` })
      }
      res.status(200).json({ status: 'success', message: 'Post updated successfully!!!', data: post })
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
    }
  }

  static deletePost = async (req, res) => {
    try {
      const { id } = req.params
      const post = await Post.findByIdAndDelete(id)
      if (!post) {
        return res.status(404).json({ status: 'error', message: `No post exist with id: ${id}` })
      }
      res.status(200).json({ status: 'success', message: 'Post deleted successfully!!!' })
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
    }
  }
}

export default PostsController