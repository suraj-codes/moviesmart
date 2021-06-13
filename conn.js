const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://Suraj:Suraj@cluster0.5roes.mongodb.net/MovieMart?retryWrites=true&w=majority",{
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected");
}).catch((e)=>{
    console.log(e);
})