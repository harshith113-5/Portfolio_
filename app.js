const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyparser = require("body-parser", { UserNewUrlparser: true });
const fs=require('fs');
const path = require("path");

const host='127.0.0.1';
const port = 8080;

mongoose.connect("mongodb+srv://harshith:harshith1520@cluster.jl03mrs.mongodb.net/portfolio?retryWrites=true&w=majority");

app.use(express.urlencoded({ extended: true }));

var contactdetails = new mongoose.Schema({
  name: String,
  mail: String,
  feed: String,
});

var cd = mongoose.model("cd", contactdetails);

app.use('/imgs', express.static('imgs'));
app.use('/views', express.static('views'));
app.set('/views',__dirname,'views')

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../GDSC_PortFolio','views','index.html'));
})
app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'../GDSC_PortFolio','views','index.html'));
})
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'../GDSC_PortFolio','views','about.html'));
})
app.get('/projects',(req,res)=>{
    res.sendFile(path.join(__dirname,'../GDSC_PortFolio','views','projects.html'));
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'../GDSC_PortFolio','views','contact.html'));
})

app.post("/contact", (req, res) => {
    var out = new cd(req.body);
    out.save().then(() => {
        res.redirect('/contact');
    }).catch(() => {
        res.status(400).send("Failed");
    });
});

app.listen(port, () => {
    console.log(`success http://${host}:${port}`);
});