// Use the web-push library to hide the implementation details of the communication
// between the application server and the push service.
// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and
// https://tools.ietf.org/html/draft-ietf-webpush-encryption.
var webPush = require("web-push");
var express = require("express");
var router = express.Router();

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log(
    "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
      "environment variables. You can use the following ones:"
  );
  console.log(webPush.generateVAPIDKeys());
  return;
}
// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
  "https://127.0.0.1/push",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

router.get("/", function (req, res) {
  console.log("push/");
  res.send("Push System : Working...");
});

router.get("/vapidPublicKey", function (req, res) {
  console.log("push/vapidPublicKey");
  res.send(process.env.VAPID_PUBLIC_KEY);
});

router.post("/register", function (req, res) {
  // A real world application would store the subscription info.
  var subscription = req.body.subscription;
  res.sendStatus(201);
});

router.post("/sendNotification", function (req, res) {
  console.log(">>> POST /sendNotification");
  const subscription = req.body.subscription;
  const payload = req.body.payload;
  const options = {
    TTL: req.body.ttl,
  };
  console.log(">>> POST endpoint");
  console.log(">>> POST subscription " + subscription);

  setTimeout(function () {
    webPush
      .sendNotification(subscription, payload, options)
      .then(function () {
        res.sendStatus(201);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
  }, req.body.delay * 1000);
});

module.exports = router;
