import dotenv from "dotenv"
import connectDB from "./db/index.js"


dotenv.config({path: './env'})

connectDB()



// ;(async () => {
//     try {
//         await mongoose.connect(`${process.env.MONOGOGB_URI}/${DB_NAME}`)
//     } catch (error) {
//         console.log(error);
//     }
// })()