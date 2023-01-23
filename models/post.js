import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
}, { timestamps: true })

const Post = mongoose.model('post', postSchema)
export default Post