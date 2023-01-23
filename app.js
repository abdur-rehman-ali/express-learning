import express from "express";
import bodyParser from "body-parser";

import postsRoutes from "./routes/postsRoutes.js";
import connectDatabase from "./database/connectDatabase.js";

const app = express()
const PORT = process.env.PORT || 3000
const DATABASE_URL = 'mongodb://localhost:27017/PostsApplication'

connectDatabase(DATABASE_URL)

// Middlewares
app.use(express.json())

app.use('/posts', postsRoutes)

app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
})