import connectDatabase from "./database/connectDatabase.js";
import dotenv from "dotenv"
dotenv.config()

import Product from "./models/product.js";


import jsonProduct from './products.json' assert { type: "json" };

const populateData = async () => {
  try {
    await connectDatabase(process.env.DATABASE_URL)
    await Product.deleteMany()
    await Product.create(jsonProduct)
    console.log('Success');
    process.exit(0)
  } catch (error) {
    console.log('Error', error);
    process.exit(1)
  }
}
populateData()