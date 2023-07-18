import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use("/api/v1/user", userRoutes)
app.use("/ping",(req, res) =>{
    res.send("Server is working")
})

app.all("*",(req, res) =>{
    res.status(404).send(`!oops page not found`)
})

export default app