const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/webhook', async (req, res) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    body: req.body
  };

  // Save log to a local file for now (optional)
  fs.appendFileSync('webhook_logs.txt', JSON.stringify(logEntry, null, 2) + ',\n');

  console.log('Received webhook:', logEntry);

  // Optional: forward to Zapier (replace with your actual Zapier webhook URL)
  // await axios.post('https://hooks.zapier.com/hooks/catch/23602547/u3h2f6n/', req.body);

  res.status(200).send('Received');
});

app.listen(PORT, () => {
  console.log(`Webhook logger listening on port ${PORT}`);
});
