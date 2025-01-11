const mongoose = require('mongoose');

const cryptoStatsSchema = new mongoose.Schema({
  cryptoId: {
    type: String,
    required: true,
    index: true
  },
  priceUsd: {
    type: Number,
    required: true
  },
  marketCapUsd: {
    type: Number,
    required: true
  },
  change24h: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('CryptoStats', cryptoStatsSchema);