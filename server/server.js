import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import recipeRoutes from './routes/recipes.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv';
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

connectDB(process.env.MONGODB_URL)

app.use('/api/auth', authRoutes)
app.use('/api/recipes', recipeRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Server running on port', PORT))
