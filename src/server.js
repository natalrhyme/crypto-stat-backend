const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { fetchCryptoData } = require('./services/cryptoService');
const { calculateStandardDeviation } = require('./utils/mathUtils');
const CryptoStats = require('./models/CryptoStats');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crypto_stats', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


cron.schedule('0 */2 * * *', async () => {
  try {
    console.log('Running crypto data fetch job...');
    await fetchCryptoData();
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

// API Routes
app.get('/stats/:cryptoId', async (req, res) => {
  try {
    const { cryptoId } = req.params;
    const latestStats = await CryptoStats.findOne({ cryptoId }).sort({ timestamp: -1 });
    
    if (!latestStats) {
      return res.status(404).json({ error: 'Cryptocurrency stats not found' });
    }

    res.json(latestStats);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/deviation/:cryptoId', async (req, res) => {
  try {
    const { cryptoId } = req.params;
    const last100Records = await CryptoStats.find({ cryptoId })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('priceUsd');

    if (!last100Records.length) {
      return res.status(404).json({ error: 'No records found for this cryptocurrency' });
    }

    const prices = last100Records.map(record => record.priceUsd);
    const deviation = calculateStandardDeviation(prices);

    res.json({ standardDeviation: deviation });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});