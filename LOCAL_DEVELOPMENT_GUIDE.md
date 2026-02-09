# Option 2: Local Development with Backend Server

## Overview

This setup allows you to test Paystack payments on localhost by running a local backend server that handles API routes.

---

## Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Enable cross-origin requests
- `dotenv` - Load environment variables
- `concurrently` - Run multiple commands at once

### Step 2: Create .env File

Create a `.env` file in your project root:

```bash
cp .env.example .env
```

Then edit `.env` and add your Paystack TEST keys:

```env
PAYSTACK_SECRET_KEY=sk_test_your_test_key_here
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_test_key_here
VITE_APP_URL=http://localhost:5173
```

**Important:** Use TEST keys (sk_test_...), not LIVE keys!

### Step 3: Start Development Servers

You have two options:

#### Option A: Run Both Servers Together (Recommended)
```bash
npm run dev:all
```

This starts:
- Frontend (Vite) on `http://localhost:5173`
- Backend (Express) on `http://localhost:3000`

#### Option B: Run Servers Separately
**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:api
```

---

## How It Works

### Architecture:

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Browser       │         │  Local Backend   │         │  Paystack   │
│  localhost:5173 │────────▶│  localhost:3000  │────────▶│  API        │
│  (Frontend)     │         │  (API Routes)    │         │             │
└─────────────────┘         └──────────────────┘         └─────────────┘
```

1. **Frontend** (React/Vite) runs on port 5173
2. **Backend** (Express) runs on port 3000
3. Frontend calls `/api/initialize-payment` → Goes to localhost:3000
4. Backend calls Paystack API with your secret key
5. Paystack responds to backend
6. Backend sends response to frontend

---

## Testing Payment Flow

### Step 1: Open Your Site
```
http://localhost:5173
```

### Step 2: Go to Registration
```
http://localhost:5173/register
```

### Step 3: Fill Form and Pay
- Fill out registration form
- Click "Pay Online with Paystack"
- Should redirect to Paystack checkout

### Step 4: Use Test Card
```
Card Number: 4084 0840 8408 4081
CVV: 408
Expiry: 12/25
PIN: 0000
OTP: 123456
```

### Step 5: Verify Success
- Should redirect back to localhost:5173
- Should show success page
- Should display receipt

---

## Troubleshooting

### Problem: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Problem: "Port 3000 already in use"
**Solution:**
Kill the process using port 3000:
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or change the port in `server.js`:
```javascript
const PORT = 3001; // Change to any available port
```

### Problem: "CORS error"
**Solution:**
The server already has CORS enabled. If you still see errors:
1. Check browser console for exact error
2. Verify frontend is on localhost:5173
3. Verify backend is on localhost:3000

### Problem: "Payment configuration error"
**Solution:**
1. Check `.env` file exists
2. Verify PAYSTACK_SECRET_KEY is set
3. Restart backend server: `npm run dev:api`

### Problem: Backend not starting
**Solution:**
Check for syntax errors:
```bash
node server.js
```

Look for error messages and fix them.

---

## Advantages of Local Development

✅ **Instant Feedback**
- No need to deploy
- Test changes immediately
- Faster iteration

✅ **Real Integration**
- Tests actual Paystack API
- Tests actual payment flow
- Same as production

✅ **Better Debugging**
- See backend logs in terminal
- Add console.log statements
- Easier to debug issues

✅ **Offline Development**
- Work without internet (except for Paystack calls)
- No deployment delays
- Full control

---

## Development Workflow

### Making Changes:

1. **Edit frontend code** (React components)
   - Vite auto-reloads
   - See changes instantly

2. **Edit backend code** (server.js)
   - Stop backend: `Ctrl+C`
   - Restart: `npm run dev:api`
   - Or use nodemon for auto-reload

3. **Test payment flow**
   - Use test card
   - Check terminal logs
   - Debug as needed

---

## Backend Server Logs

When running `npm run dev:api`, you'll see:

```
🚀 Local API server running on http://localhost:3000
📡 API endpoints available at:
   - POST http://localhost:3000/api/initialize-payment
   - GET  http://localhost:3000/api/verify-payment

✅ Ready to handle payment requests!
```

When a payment is made, you'll see:
```
Payment initialization request received
Calling Paystack API...
Paystack response: 200 OK
```

---

## Environment Variables

### Required:
```env
PAYSTACK_SECRET_KEY=sk_test_...
VITE_PAYSTACK_PUBLIC_KEY=pk_test_...
VITE_APP_URL=http://localhost:5173
```

### Optional:
```env
PORT=3000  # Backend port (default: 3000)
```

---

## Switching Between Test and Live

### For Testing (Development):
```env
PAYSTACK_SECRET_KEY=sk_test_your_test_key
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_test_key
```

### For Production (Live):
```env
PAYSTACK_SECRET_KEY=sk_live_your_live_key
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_live_key
```

**Never commit .env file to git!**

---

## Auto-Reload Backend (Optional)

To auto-reload backend on changes:

### Install nodemon:
```bash
npm install -D nodemon
```

### Update package.json:
```json
"scripts": {
  "dev:api": "nodemon server.js"
}
```

Now backend auto-reloads when you edit server.js!

---

## Production Deployment

When deploying to Vercel:
- Vercel uses `/api` folder (serverless functions)
- Local `server.js` is NOT deployed
- This is only for local development

To deploy:
```bash
git add .
git commit -m "Your message"
git push
```

Vercel automatically deploys and uses the `/api` folder.

---

## Comparison: Local vs Vercel

| Feature | Local (Option 2) | Vercel (Option 3) |
|---------|------------------|-------------------|
| Setup | Install deps | Just push code |
| Speed | Instant | 1-2 min deploy |
| Debugging | Easy (logs) | Check Vercel logs |
| Real API | ✅ Yes | ✅ Yes |
| Internet | Needed for Paystack | Needed |
| Best for | Active development | Testing before live |

---

## Summary

**Use Local Development when:**
- ✅ Actively developing payment features
- ✅ Need instant feedback
- ✅ Want to see backend logs
- ✅ Debugging payment issues

**Use Vercel Testing when:**
- ✅ Final testing before going live
- ✅ Testing on different devices
- ✅ Sharing with others
- ✅ Production-like environment

**Both are valid! Use what works best for you! 🚀**
