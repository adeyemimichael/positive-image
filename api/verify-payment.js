// Vercel API route to verify Paystack payment
// This keeps your secret key secure on the backend

import https from 'https';

export default async function handler(req, res) {
  // Set CORS headers - restrict to specific domains
  const allowedOrigins = [
    'https://positiveimgeschools.com',
    'https://www.positiveimgeschools.com',
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({ error: 'Payment reference is required' });
    }

    // Reference validation (alphanumeric, hyphens, and underscores only)
    const refRegex = /^[A-Za-z0-9_-]+$/;
    if (!refRegex.test(reference)) {
      return res.status(400).json({ error: 'Invalid reference format' });
    }

    // Paystack secret key from environment variable
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
}