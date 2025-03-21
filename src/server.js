const app =require ('./index')
const connectDB =require('./config/databse')
const PORT = process.env.PORT || 8080

const server =app.listen(PORT,async()=>{
    try{
        await connectDB()
        console.log(`Server is Listening On Port Number:- ${PORT}`)
  } catch (error) {
    console.error(`Error:${error.message}`)

    }
})