const express = require("express")
const cors = require("cors")
const app = express()


//usecase
app.use(express.json())
app.use(cors())


//i am listening
app.listen(5100, ()=>{
    console.log("currently runnig on port 5100.....")
})