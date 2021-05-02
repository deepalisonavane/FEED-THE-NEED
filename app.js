const express = require("express");
const app = express();
const request = require("request");
require("./db/conn");
var router = express.Router();
var Router = require('router')
var expressHbs = require('express-handlebars');

const Register = require("./models/registerdata");
const Donation = require("./models/donations");


const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const { fstat } = require("fs");
const { response } = require("express");
const { URLSearchParams } = require("url");
const port = process.env.PORT || 3000;

const stactic_path = path.join(__dirname, "public");
const template_path = path.join(__dirname, "/templates/views");
const partial_path = path.join(__dirname, "templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(stactic_path));

app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);

// hbs.handlebars.registerHelper('',async function(userr){
//     try {
//         let userr =  await Donation.find();   
//         Promise.resolve(userr);
//     } catch (error) {
//         res.send(err)
        
//     }
// }
//     );




//main index hbs
app.get("/", (req,res) =>{
    res.render("index");
});

//volunteer hbs

app.get('/volunteer', async function(req, res) {
  const data = await Donation.find()
  await res.render("volunteer", {donations: data});
});

//donor hbs
app.get("/donor", (req,res) =>{
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
          const donar = new Register({
              firstname : req.body.firstname,
              email : req.body.email,
              phoneno : req.body.phoneno,
              password :password,
              cpassword :cpassword
          })

          const registerd = await donar.save();
         
        }else{
            res.send("password are not matching");
        }
        res.status(201).render("donor");

    } catch (error) {
       res.status(400).send(error);
    }
  
});


app.post("/login", async(req,res) =>{
try {
    const email = req.body.email;
    const password = req.body.password;
     const useremail = await Register.findOne({email:email})
     const ismatch = await bcrypt.compare(password, useremail.password);
     
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