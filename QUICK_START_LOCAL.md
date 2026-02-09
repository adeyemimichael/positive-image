# 🚀 Quick Start - Local Payment Testing

## What This Does
Test Paystack payments on **localhost** with real Paystack API (using test keys).

---

## ✅ Setup Complete!
Your local backend server is ready. Here's how to use it:

---

## 🎯 Start Local Development (2 Commands)

### Option A: Run Both Servers Together (Recommended)
```bash
npm run dev:all
```
This starts:
- Frontend on `http://localhost:5173`
- Backend API on `http://localhost:3000`

### Option B: Run Separately (Advanced)
**Terminal 1 - Backend:**
```bash
npm run dev:api
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## 🧪 Test Payment Flow

1. **Open your browser:**
   ```
   http://localhost:5173/register
   ```

2. **Fill the registration form:**
   - Name: Test User
   - Email: test@example.com
   - Phone: 08012345678
   - Select package

3. **Click "Pay Online with Paystack"**

4. **Use Paystack Test Card:**
   ```
   Card Number: 4084 0840 8408 4081
   CVV: 408
   Expiry: 12/25
   PIN: 0000
   OTP: 123456
   ```

5. **Verify redirect:**
   - Should redirect back to `http://localhost:5173/payment-callback`
   - Should show receipt with payment details

---

## 🔍 How to Know It's Working

### Backend Server (Terminal 1):
```
✅ Backend API running on http://localhost:3000
✅ Paystack Secret Key loaded
```

### Frontend (Terminal 2):
```
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:5173/
```

### Browser Console (F12):
```
✅ Payment initialized successfully
✅ Redirecting to Paystack...
✅ Payment verified successfully
```

---

## 🐛 Troubleshooting

### Error: "Port 3000 already in use"
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Then restart
npm run dev:all
```

### Error: "PAYSTACK_SECRET_KEY not found"
Check your `.env` file has:
```
PAYSTACK_SECRET_KEY=sk_test_your_key_here
```

### Error: "Failed to fetch"
Make sure backend is running:
```bash
curl http://localhost:3000/api/initialize-payment
```
Should return: `{"error":"Invalid request method"}`

### Payment doesn't redirect back
Check `.env` has:
```
VITE_APP_URL=http://localhost:5173
```

---

## 🎉 What's Different from Production?

| Feature | Localhost | Production (Vercel) |
|---------|-----------|---------------------|
| Frontend | `localhost:5173` | `your-site.vercel.app` |
| Backend | `localhost:3000` (Express) | Vercel Serverless |
| Paystack Keys | Test keys | Test/Live keys |
| Database | Same (Supabase) | Same (Supabase) |

---

## 🔐 Security Notes

✅ **Safe to use:**
- Test keys only (no real money)
- Local development only
- Not deployed to production

❌ **Never commit:**
- `.env` file (already in `.gitignore`)
- Real secret keys

---

## 📚 Next Steps

1. **Test locally** (you're here!)
2. **Test on Vercel** (see `VERCEL_TESTING_GUIDE.md`)
3. **Switch to live keys** (when ready for production)

---

## 🆘 Need Help?

- Full guide: `LOCAL_DEVELOPMENT_GUIDE.md`
- Vercel testing: `VERCEL_TESTING_GUIDE.md`
- Payment issues: Check browser console (F12)

---

**Ready to test? Run:**
```bash
npm run dev:all
```

Then open: `http://localhost:5173/register`
