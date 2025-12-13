import express from "express"
import noteRoutes from "./routes/noteRoutes.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB();

//Middleware to allow parsing of jsons
app.use(express.json())

app.use("/api/notes", noteRoutes)

app.listen(PORT, () => {
    console.log("Server started on port:", PORT)
})
