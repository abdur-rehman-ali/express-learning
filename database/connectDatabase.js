import mongoose from "mongoose";

const connectDatabase = async DATABASE_URL => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Database connected!!!');
  } catch (error) {
    console.log('Error while connecting DB', error.message);
  }
}

export default connectDatabase