const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/feedtheneed",{
useCreateIndex:true,
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>{
    console.log("connection sucessful");
}).catch((err) =>{
    console.log("connection failed");
})

