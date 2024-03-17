var webPush = require("web-push");
var express = require("express");
var router = express.Router();

let endpoint, p256dh, auth;

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log(webPush.generateVAPIDKeys());
  return;
}
// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
  "https://127.0.0.1/push",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

router.post("/", async (req, res) => {
  endpoint = req.body.endpoint;
  p256dh = req.body.p256dh;
  auth = req.body.auth;
  res.status(200).json();
});

router.post("/new-message", async (req, res) => {
  const { message } = req.body;

  const pushSubscription = {
    endpoint,
    keys: {
      p256dh,
      auth,
    },
  };

  const notificationPayload = JSON.stringify({
    title: "Notificación del blog de solidarianID",
    body: message,
  });
  try {
    await webPush.sendNotification(pushSubscription, notificationPayload);
    res.status(200).json({ message: "Notificación enviada con éxito" });
  } catch (error) {
    console.error("Error al enviar la notificación push:", error);
    res.status(500).json({ error: "Error al enviar la notificación push" });
  }
});

module.exports = router;
