const express = require("express")
const app = express()
const mongoose = require("mongoose")
const configure = require("./configure")
const User = require("./user_service/user")
const bcrypt = require('bcrypt')
const path = require('path')
const db = mongoose.connect("mongodb+srv://Yatin2412:Yatin123@cluster0.gl6ht4o.mongodb.net/user_auth", {useNewUrlParser: true})


app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("home");
});


app.get("/login", (req, res) => {
  res.render("login");
});


app.post("/login", async (req, res) => {
  
  try {
    const values = await User.findOne({ username: req.body.username });
    if(!values){
      return res.status(404).send("User not found")
    }
    else{
      if(await bcrypt.compare(req.body.password,values.password))
    {
      const a =path.join(__dirname,"/..","/..","/client","/public","index.html")
      res.sendFile(a);
    } else {
      res.write("Password incorrect");
      res.send();
    }}
  } catch {
    res.write("Username invalid");
    res.send();
  }
});


app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register",async (req, res) => {
  //console.log(req)
  const hash = await bcrypt.hash(req.body.password,10)
  const added = await User.create({
    username: req.body.username,
    password: hash,
    phone: req.body.phone,
  });
  res.redirect("/login");
});


app.get("/userprofile.js", (req, res) => {
  res.render("userprofile");
});


app.listen(configure.PORT, configure.HOST, () => {
    console.log(`APP LISTENING ON http://${configure.HOST}:${configure.PORT}`);
})
////////////////////////////////