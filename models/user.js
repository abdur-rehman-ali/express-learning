import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  termsAndConditions: { type: Boolean, required: true }
})

const User = mongoose.model('user', userSchema)
export default User;