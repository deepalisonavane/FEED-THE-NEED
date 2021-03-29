const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

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

donarSchema.pre("save", async function(next) {
    if(this.isModified("password")){
 console.log(`passwor ${this.password}`);
 this.password = await bcrypt.hash(this.password,10);
 console.log(`passwor ${this.password}`);
this.cpassword = undefined;
    }
 next();
})

//collections
 
 const Register = new mongoose.model("Register" ,donarSchema);
 module.exports = Register;