# 💳 Paystack Payment Integration Guide (Vercel)

## 🎯 Overview
Your school registration system now has secure Paystack payment integration with the secret key safely stored on Vercel API routes.

## 🔐 Security Features
- ✅ Secret key stored on backend (Vercel API Routes)
- ✅ Public key used on frontend only
- ✅ Payment initialization via secure backend API
- ✅ Payment verification via secure backend API
- ✅ No sensitive keys exposed in browser

---

## 🚀 Setup Instructions

### Step 1: Get Paystack API Keys

1. **Create Paystack Account**:
   - Go to [https://paystack.com](https://paystack.com)
   - Sign up for an account
   - Complete business verification

2. **Get API Keys**:
   - Login to [Paystack Dashboard](https://dashboard.paystack.com)
   - Go to Settings → API Keys & Webhooks
   - Copy your **Public Key** (starts with `pk_test_` or `pk_live_`)
   - Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

### Step 2: Configure Environment Variables

#### For Local Development:

1. Create `.env` file in project root:
```bash
cp .env.example .env
```

2. Add your keys to `.env`:
```env
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_actual_public_key
PAYSTACK_SECRET_KEY=sk_test_your_actual_secret_key
VITE_APP_URL=http://localhost:5173
```

#### For Production (Vercel):

1. Go to your Vercel project dashboard
2. Navigate to: Settings → Environment Variables
3. Add these variables:
   - `VITE_PAYSTACK_PUBLIC_KEY` = your public key
   - `PAYSTACK_SECRET_KEY` = your secret key
   - `VITE_APP_URL` = your production URL (e.g., https://yourschool.vercel.app)

### Step 3: Test Locally with Vercel Dev

1. **Install Vercel CLI** (if not installed):
```bash
npm install -g vercel
```

2. **Run development server**:
```bash
vercel dev
```

This will:
- Start your Vite dev server
- Start Vercel API routes locally
- Make API routes available at `http://localhost:3000/api`

### Step 4: Test Payment Flow

1. **Use Paystack Test Cards**:
   - Card: `4084084084084081`
   - CVV: `408`
   - Expiry: Any future date
   - PIN: `0000`
   - OTP: `123456`

2. **Test the flow**:
   - Fill registration form
   - Click "Pay Online with Paystack"
   - Use test card details
   - Complete payment
   - Verify redirect to success page

---

## 📁 File Structure

```
positive-image/
├── api/
│   ├── initialize-payment.js        # Backend: Initialize payment
│   └── verify-payment.js            # Backend: Verify payment
├── src/
│   ├── config/
│   │   └── paystack.ts             # Paystack configuration
│   ├── services/
│   │   └── paystackService.ts      # Frontend payment service
│   └── pages/
│       ├── Payment.tsx             # Payment page
│       └── PaymentCallback.tsx     # Payment verification page
├── .env.example                     # Environment variables template
└── .env                            # Your actual keys (gitignored)
```

---

## 🔄 Payment Flow

1. **User fills registration form** → Clicks "Pay with Paystack"
2. **Frontend calls** → `/api/initialize-payment`
3. **Backend initializes** → Payment with Paystack API (using secret key)
4. **Paystack returns** → Authorization URL
5. **User redirected** → To Paystack payment page
6. **User completes payment** → On Paystack
7. **Paystack redirects** → To `/payment-callback?reference=xxx`
8. **Frontend calls** → `/api/verify-payment`
9. **Backend verifies** → Payment with Paystack API
10. **Success page** → Shows confirmation

---

## 💰 Payment Options

Users can choose between:

1. **Online Payment (Paystack)**:
   - Credit/Debit Cards
   - Bank Transfer
   - USSD
   - Mobile Money
   - QR Code

2. **Manual Bank Transfer**:
   - Direct bank transfer
   - Manual verification by admin

---

## 🧪 Testing

### Test Mode (Development):
- Use test API keys (`pk_test_` and `sk_test_`)
- Use Paystack test cards
- No real money charged

### Live Mode (Production):
- Use live API keys (`pk_live_` and `sk_live_`)
- Real payments processed
- Real money charged

---

## 🔧 Troubleshooting

### Issue: "Payment configuration error"
**Solution**: Ensure `PAYSTACK_SECRET_KEY` is set in Vercel environment variables

### Issue: API routes not working locally
**Solution**: Run `vercel dev` instead of `npm run dev`

### Issue: Payment verification fails
**Solution**: Check that the payment reference matches and payment was successful on Paystack dashboard

### Issue: Redirect not working
**Solution**: Verify `VITE_APP_URL` is set correctly in environment variables

---

## 📊 Monitoring Payments

1. **Paystack Dashboard**:
   - View all transactions
   - Check payment status
   - Download reports
   - Manage refunds

2. **Your Application**:
   - Check browser console for logs
   - Verify localStorage for registration data
   - Check email notifications

---

## 🔒 Security Best Practices

✅ **DO**:
- Keep secret key in environment variables
- Use HTTPS in production
- Verify payments on backend
- Log all transactions
- Monitor for suspicious activity

❌ **DON'T**:
- Commit `.env` file to git
- Expose secret key in frontend code
- Trust frontend payment status without verification
- Skip payment verification step

---

## 📞 Support

- **Paystack Support**: support@paystack.com
- **Paystack Docs**: https://paystack.com/docs
- **Paystack Dashboard**: https://dashboard.paystack.com

---

## 🎉 You're All Set!

Your payment system is now secure and ready to accept payments. Test thoroughly in test mode before going live!
