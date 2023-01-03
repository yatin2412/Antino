var nodemailer = require('nodemailer');

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