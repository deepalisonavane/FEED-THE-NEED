const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

        fooditems :String,
        quantity : String,
        email :String,
        contactno :Number,
        meetingpoint : String,
        expirydate :Date
        
    })


    const Donation = new mongoose.model("Donotion" ,foodSchema);
     module.exports = Donation;
