const express = require("express");
const app = express();
require("./db/conn");
const path = require("path");
const port = process.env.PORT || 3000;

const stactic_path = path.join(__dirname, "public");

app.use(express.static(stactic_path));

app.get("/bye", (req,res) =>{
    res.send('hii');
});

app.listen(port,()=>{
    console.log(`listeing to port ${port}`);
})

