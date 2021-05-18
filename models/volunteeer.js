const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
    volname: String,
    volemail :String,
    volno : Number,
    voladd :String,
    volveh:String
    });


    const Volunteer = new mongoose.model("Volunteer" ,volunteerSchema);
     module.exports = Volunteer;