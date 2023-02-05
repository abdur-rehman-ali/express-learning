import express from "express";
import dotenv from 'dotenv'
dotenv.config()

import postsRoutes from "./routes/postsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

import connectDatabase from "./database/connectDatabase.js";
import pageNotFound from "./middlewares/pageNotFound.js";

const app = express()
const PORT = process.env.PORT || 8000


// Middlewares
app.use(express.json())

app.use('/', usersRoutes)
app.use('/posts', postsRoutes)
app.use('/products', productsRoutes)
app.use(pageNotFound)

const start = async () => {
  try {
    await connectDatabase(process.env.DATABASE_URL)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  } catch (error) {
    console.log(error.message);
  }
}

start()