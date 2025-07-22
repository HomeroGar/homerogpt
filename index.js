const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Ruta de verificación de webhook de Meta
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "tutokenseguro";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Ruta POST para recibir mensajes
app.post("/webhook", (req, res) => {
  console.log("Mensaje recibido:");
  console.dir(req.body, { depth: null });
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});