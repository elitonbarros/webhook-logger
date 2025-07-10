const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/webhook', async (req, res) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    body: req.body
  };

  console.log('📦 Received webhook:', JSON.stringify(logEntry, null, 2));

  // Optional forwarding to Zapier
  try {
    await axios.post('https://hooks.zapier.com/hooks/catch/23602547/u3h2f6n/', req.body);
    console.log('✅ Forwarded to Zapier');
  } catch (err) {
    console.error('❌ Error forwarding to Zapier:', err.message);
  }

  res.status(200).send('Received');
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook logger listening on port ${PORT}`);
});
