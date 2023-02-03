import mongoose from "mongoose";

//This method will return a promise
const connectDatabase = DATABASE_URL => {
  return mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

export default connectDatabase