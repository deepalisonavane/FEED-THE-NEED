require('dotenv').config();
const express = require("express");
const app = express();
require("./db/conn");
const Register = require("./models/registerdata");
const Donation = require("./models/donations");
const auth = require("./middleware/auth");

const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { fstat } = require("fs");
const { response } = require("express");
const { URLSearchParams } = require("url");
const port = process.env.PORT || 3000;

const stactic_path = path.join(__dirname, "public");
const template_path = path.join(__dirname, "/templates/views");
const partial_path = path.join(__dirname, "templates/partials");


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use(express.static(stactic_path));

app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);

//main index hbs
app.get("/", (req,res) =>{
    res.render("index");
});

//volunteer hbs

app.get('/volunteer', auth , async function(req, res) {
  const data = await Donation.find()
  await res.render("volunteer", {donations: data});
});

//donor hbs
app.get("/donor", auth , (req,res) =>{
    //console.log(`this is cookiee ${req.cookies.jwt}`);
    res.render("donor");
    
});


//register hbs
app.get("/register", (req,res) =>{
    res.render("register");
});

//login hbs
app.get("/login", (req,res) =>{
    res.render("login");
});


//fetching data from user
app.post("/register", async (req,res) =>{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password === cpassword){
          const donard = new Register({
              firstname : req.body.firstname,
              email : req.body.email,
              phoneno : req.body.phoneno,
              password :password,
              cpassword :cpassword
          })
        
         
        
        const token =  await donard.generateToken();
        console.log(token);
         
        res.cookie("jwt", token),{
            // expires:new Date(Date.now()+60000),

            httponly:true
        };
          const registerd = await donard.save();
         
        }else{
            res.send("password are not matching");
        }

        res.status(201).render("donor");

    } catch (error) {
       res.send(error);
       console.log("errorr");
    }
  
});


app.post("/login", async(req,res) =>{
try {
    const email = req.body.email;
    const password = req.body.password;
     const useremail = await Register.findOne({email:email});
     
     const ismatch = await bcrypt.compare(password, useremail.password);
     const token =  await useremail.generateToken();
        console.log(token);

        res.cookie("jwt", token),{
            //expires:new Date(Date.now()+60000),
            httponly:true
        };
     
     if(ismatch){
         res.status(201).render("donor");
     }else{
         res.send("Invalid Login");
     }

} catch (error) {
    res.status(400).send("Invalid Login Details");  
}
})


//fetching data from fooddetails

app.post("/donor", async(req,res) =>{
try {

    const food = new Donation({
        donar :req.body.donar,
        fooditems :req.body.fooditems,
        quantity : req.body.quantity,
        email : req.body.email,
        contactno : req.body.contactno,
        meetingpoint : req.body.meetingpoint,
        expirydate : req.body.expirydate,
        foodtype : req.body.foodtype,
        results : req.body.results
    })

      const donationrec = await food.save();
      res.status(201).render("index");

} catch (error) {
  res.status(400).send("error");  
}

})


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})