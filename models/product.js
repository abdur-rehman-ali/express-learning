import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name must be present'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'price must be present']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 3.0
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported'
    }
  }
}, { timestamps: true })

export default mongoose.model('product', productSchema)