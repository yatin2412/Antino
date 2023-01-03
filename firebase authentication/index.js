const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const credentials = require("./serviceaccountkey.json");


const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json())
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

app.post("/signup", async (req, res) => {
  const userResponse = await admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  });
  res.json(userResponse);
});

app.post("/login", async (req, res, next) => {
    
});

app.listen(4000, () => console.log("The server is running at PORT 4000"));
// 