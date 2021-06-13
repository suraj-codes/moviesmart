const express = require("express")
const app = express()
const cors = require('cors')
const route = require("./routes")
const port = process.env.PORT || 8000
require("./conn")
app.use(cors())
app.use("/",route)

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"))
}

app.listen(port,()=>{
    console.log(`listening at ${port}`)
})