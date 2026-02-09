// Local development server to run Vercel API routes
// This allows testing payment integration on localhost

const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load environment variables
require('dotenv').config();

// Initialize Payment Route
app.post('/api/initialize-payment', async (req, res) => {
  try {
    const { email, amount, reference, metadata } = req.body;

    // Validate required fields
    if (!email || !amount || !reference) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Amount validation
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0 || numAmount > 10000000) {
      return res.status(400).json({ 
        error: 'Invalid amount. Amount must be between 1 and 10,000,000 Naira' 
      });
    }

    // Reference validation
    const refRegex = /^[A-Za-z0-9_-]+$/;
    if (!refRegex.test(reference)) {
      return res.status(400).json({ error: 'Invalid reference format' });
    }

    // Paystack secret key
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    if (!PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ error: 'Payment configuration error' });
    }

    // Callback URL for localhost
    const callbackUrl = 'http://localhost:5173/payment-callback';

    // Prepare Paystack request
    const paystackData = JSON.stringify({
      email,
      amount: amount * 100, // Convert to kobo
      reference,
      metadata: metadata || {},
      callback_url: callbackUrl
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(paystackData)
      }
    };

    // Make request to Paystack
    const paystackResponse = await new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          resolve({
            statusCode: response.statusCode,
            body: data
          });
        });
      });

      request.on('error', (error) => {
        reject(error);
      });

      request.write(paystackData);
      request.end();
    });

    const responseData = JSON.parse(paystackResponse.body);
    return res.status(paystackResponse.statusCode).json(responseData);

  } catch (error) {
    console.error('Payment initialization error:', error);
    return res.status(500).json({ 
      error: 'Failed to initialize payment',
      message: error.message 
    });
  }
});

// Verify Payment Route
app.get('/api/verify-payment', async (req, res) => {
  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({ error: 'Payment reference is required' });
    }

    // Reference validation
    const refRegex = /^[A-Za-z0-9_-]+$/;
    if (!refRegex.test(reference)) {
      return res.status(400).json({ error: 'Invalid reference format' });
    }

    // Paystack secret key
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    if (!PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ error: 'Payment configuration error' });
    }

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
      }
    };

    // Make request to Paystack
    const paystackResponse = await new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          resolve({
            statusCode: response.statusCode,
            body: data
          });
        });
      });

      request.on('error', (error) => {
        reject(error);
      });

      request.end();
    });

    const responseData = JSON.parse(paystackResponse.body);
    return res.status(paystackResponse.statusCode).json(responseData);

  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ 
      error: 'Failed to verify payment',
      message: error.message 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Local API server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at:`);
  console.log(`   - POST http://localhost:${PORT}/api/initialize-payment`);
  console.log(`   - GET  http://localhost:${PORT}/api/verify-payment`);
  console.log(`\n✅ Ready to handle payment requests!\n`);
});
