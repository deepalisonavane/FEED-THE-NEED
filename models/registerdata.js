const mongoose = require("mongoose");

const donarSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneno:{
        type:Number,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword :{
        type:String,
        required:true
    }
})
//collections
 
 const Register = new mongoose.model("Register" ,donarSchema);
 module.exports = Register;