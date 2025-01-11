# Crypto Stats Server

A Node.js server that fetches and stores cryptocurrency price statistics using mongodb as the database. The server collects data for Bitcoin, Ethereum, and Polygon (MATIC) every 2 hours and provides REST API endpoints to access the statistics.

## Features

- Automatic cryptocurrency data collection every 2 hours
- Price, market cap, and 24-hour change tracking
- Standard deviation calculations for price volatility
- REST API endpoints for data access

## Tech Stack

- Node.js
- Express.js
- mongoDB (Database)
- node-cron (Scheduled tasks)
- Axios (HTTP client)

## Prerequisites

- Node.js (v14 or higher)
- npm
- Mongodb atlas

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI= using atlas
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev   # for development
   npm start     # for production
   ```

## API Endpoints

### Get Latest Stats

Retrieves the latest statistics for a specific cryptocurrency.

```
GET /stats/:cryptoId
```

Example:
```
GET /stats/bitcoin
```
