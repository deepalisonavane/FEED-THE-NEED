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
});
 //hash for password security
 
donarSchema.pre("save", async function(next) {
    if(this.isModified("password")){
 console.log(`password ${this.password}`);
 this.password = await bcrypt.hash(this.password,10);
 console.log(`password ${this.password}`);
this.cpassword = undefined;
    }
 
});

// const foodSchema = new mongoose.Schema({

//         fooditems :String,
//         quantity : String,
//         email :String,
//         contactno :Number,
//         meetingpoint : String,
//         expirydate :Date,
        
//     })


//collections

 const Register = new mongoose.model("Register" ,donarSchema);
 module.exports = Register;

//  const Donation = new mongoose.model("donotion" ,donarSchema);
//  module.exports = Donation;



 