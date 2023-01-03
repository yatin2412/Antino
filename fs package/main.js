const reader = require("xlsx");
const mongoose = require("mongoose");
const file = reader.readFile("./final_1.xlsx");
const User = require("./user");
const Excel = require('exceljs')
const fs = require('fs')
const AWS = require('aws-sdk')
const nodemailer = require('nodemailer')
require('dotenv/config')
mongoose.set("strictQuery", true);
let data = [];

const sheets = file.SheetNames;

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    data.push(res);
  });
}
const arr = []
data.map((item)=>{
    if (!item.Phone && !item.Email){
        item.error="Email and phone No missing";}
    else if(!item.Phone){
        item.error = "Phone no missing"
    }
    else if (!item.Email){
        item.error = "Email missing"
    }
    arr.push(item)
})
console.log("LOGGING THE NEW ARRAY")
console.log(arr)
// const ws = reader.utils.json_to_sheet(arr)
// console.log(ws)
  
// reader.utils.book_append_sheet(file,ws,"Sheet3")
  
// // Writing to our file
// reader.writeFile(file,'./final_1.xlsx')


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});
const fileName = 'final_1.xlsx';

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: process.env.AWS_BUCKET_NAME,
         Key: 'final_1.xlsx',
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

//uploadFile();


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yatinnarula99913@gmail.com',
    pass: 'edoorxikgfphclat'
  }
});

var mailOptions = {
  from: 'yatinnarula99913@gmail.com',
  to: 'yatinnarula99913@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

// edoorxikgfphclat
// async function connecting() {
//   try {
//     const db = await mongoose
//       .connect(
//         "mongodb+srv://Yatin2412:Yatin123@cluster0.gl6ht4o.mongodb.net/Excel_to_mongo"
//       )
//     try {
//       const added = data.map((item) => User.create({
//           Name: item.Name,
//           Last_Name: item.Last_Name,
//           Age: item.Age,
//           Phone: item.Phone,
//           Email: item.Email
//         })
//     );
//     } catch (error) {
//       console.error(error);
//     }
//   } catch {
//     console.log("Not connected");
//   }
// }
// connecting();