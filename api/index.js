const express = require("express");
const bodyParser = require("body-parser");

var happy = 0;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("*", (req, res) => {
  console.log(req.body);
  const error = false;
  if (error) {
    return res.status(500).send(error);
  }
  return res.status(200).send("Cool that worked");
});

app.get("*", (req, res) => {
  // res.status(200).send({ data: "You are meant to send a post request Moira" });
  res.status(200).send({ happy });
});

function AnonLog() {
    
  // Configure the credentials provider to use your identity pool
  AWS.config.region = 'us-east'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:ff8c987b-fd18-4e05-90f2-546ec9548431',
  });
  // Make the call to obtain credentials
  AWS.config.credentials.get(function () {
    // Credentials will be available when this function is called.
    var accessKeyId = AWS.config.credentials.accessKeyId;
    var secretAccessKey = AWS.config.credentials.secretAccessKey;
    var sessionToken = AWS.config.credentials.sessionToken;
  });
}

function ReadFaces(imageData) {
  AWS.region = "us-east";
  var rekognition = new AWS.Rekognition();
  var params = {
    Image: {
      Bytes: imageData
    },
    Attributes: [
      'ALL',
    ]
  };
  rekognition.detectFaces(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      for (var i = 0; i < data.FaceDetails.length; i++) {
        happy = data.FaceDetails[i].Emotion.Type("HAPPY")
      }
    }
  });
}

module.exports = app;
