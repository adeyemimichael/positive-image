// Vercel API route to initialize Paystack payment
// This keeps your secret key secure on the backend

import https from 'https';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, amount, reference, metadata } = req.body;

    // Validate required fields
    if (!email || !amount || !reference) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Paystack secret key from environment variable
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    if (!PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ error: 'Payment configuration error' });
    }

    // Prepare Paystack request
    const paystackData = JSON.stringify({
      email,
      amount: amount * 100, // Paystack expects amount in kobo (multiply by 100)
      reference,
      metadata: metadata || {},
      callback_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/payment-callback`
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
}