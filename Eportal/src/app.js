import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit: "16Kb"}));
app.use(express.urlencoded({extended:true,limit:"16Kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

// routers import

import userRouter from "./routes/user.routes.js"

// routes Declaration
app.use("/api/v1/user", userRouter)

// http://localhost:8000/api/v1/user/

export {app}