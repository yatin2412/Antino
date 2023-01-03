//LINK TO LEARN :- https://www.techotopia.com/index.php/Sending_Firebase_Cloud_Messages_from_a_Node.js_Server

var admin = require("firebase-admin");

var serviceAccount = require("./notification-firebase-bd03a-firebase-adminsdk-u7f3g-aeb1c39cb1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var registrationToken = "e1n1RQmc4Ij32Oy5MNuxWa:APA91bEIBOZzcjDv3Ecp0XlZgARr-jkxsOrurAyM_CUJVwnt6pVaZDvqH_QW5UBxr7ziigSwhDLUXi7dH8eUTlRfXY5nSjppMhJvT9FdaaVISEwUeXbC9-Jd7cYSZZQZPUkE526yyeCQ";
var payload = {
  notification: {
    title: "Hello",
    body: "This is the body of the notification message.",
  },
};

var options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};
admin
  .messaging()
  .sendToDevice(registrationToken, payload, options)
  .then(function (response) {
    console.log("Successfully sent message:", response);
  })
  .catch(function (error) {
    console.log("Error sending message:", error);
  });
// 