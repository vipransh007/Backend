import dotenv from "dotenv"
import connectDB from "./db/index.js"


dotenv.config({path: './env'})

connectDB().then(() => {
    app.listen(process.env.PORT || 8000 , (req,res) =>{
        console.log(`Server is Running on the port ${process.env.PORT}`);
        
    })
})
.catch((err) => {
    console.log("MongoDB Connect Fails !!", err)
})



// ;(async () => {
//     try {
//         await mongoose.connect(`${process.env.MONOGOGB_URI}/${DB_NAME}`)
//     } catch (error) {
//         console.log(error);
//     }
// })()