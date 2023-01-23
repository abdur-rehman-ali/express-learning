import Post from '../models/post.js'

class PostsController {
  static getPosts = async (req, res) => {
    try {
      const posts = await Post.find()
      res.status(200).send(posts)
    } catch (error) {
      res.send({ status: 'failed', message: error.message })
    }
  }

  static getPost = async (req, res) => {
    try {
      const { id } = req.params
      const post = await Post.findById(id)
      res.status(200).send(post)
    } catch (error) {
      res.send({ status: 'failed', message: error.message })
    }
  }

  static createPost = async (req, res) => {
    try {
      const { title, description } = req.body
      const post = new Post({ title, description })
      await post.save()
      res.status(201).send({ message: 'Post created successfully!!!' })

    } catch (error) {
      res.send({ status: 'failed', message: error.message })
    }
  }

  static editPost = async (req, res) => {
    try {
      const { id } = req.params
      const { title, description } = req.body
      const post = { title, description }
      await Post.findByIdAndUpdate(id, post, { runValidators: true })
      res.status(200).send({ message: 'Post updated successfully!!!' })
    } catch (error) {
      res.send({ status: 'failed', message: error.message })
    }
  }

  static deletePost = async (req, res) => {
    try {
      const { id } = req.params
      await Post.findByIdAndDelete(id)
      res.status(200).send({ message: 'Post deleted successfully!!!' })
    } catch (error) {
      res.send({ status: 'failed', message: error.message })
    }
  }
}

export default PostsController