const axios = require('axios');
const CryptoStats = require('../models/CryptoStats');

const CRYPTO_IDS = ['bitcoin', 'matic-network', 'ethereum'];

async function fetchCryptoData() {
  try {
    const promises = CRYPTO_IDS.map(async (cryptoId) => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
      );

      const data = response.data[cryptoId];
      
      const stats = new CryptoStats({
        cryptoId,
        priceUsd: data.usd,
        marketCapUsd: data.usd_market_cap,
        change24h: data.usd_24h_change
      });

      await stats.save();
      console.log(`Saved stats for ${cryptoId}`);
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
}

module.exports = { fetchCryptoData };