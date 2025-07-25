const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// VALIDACIÓN DE TOKEN (GET)
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = "MI_TOKEN_SC_TEST";
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// RECEPCIÓN DE EVENTOS (POST)
app.post('/webhook', (req, res) => {
  const body = req.body;

  console.log('Webhook POST recibido:', JSON.stringify(body, null, 2));

  if (body.object) {
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
