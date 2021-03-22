const express = require("express");
const app = express();
require("./db/conn");
const Register = require("./models/registerdata");

const path = require("path");
const hbs = require("hbs");
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


//main index hbs
app.get("/", (req,res) =>{
    res.render("index");
});


//register hbs
app.get("/register", (req,res) =>{
    res.render("register");
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
        res.status(201).render("index");

    } catch (error) {
       res.status(400).send(error);
    }
  
});


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})

