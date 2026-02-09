# Option 3: Testing Payments on Vercel

## Why This Approach?

- ✅ Tests real Paystack integration
- ✅ No local backend setup needed
- ✅ Free on Vercel
- ✅ Closest to production environment
- ✅ Can use Paystack test cards

---

## Step-by-Step Guide

### Step 1: Commit Your Current Code

```bash
git add .
git commit -m "Revert mock payment code - testing on Vercel"
git push origin main
```

### Step 2: Verify Environment Variables in Vercel

**Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Make sure these are set:**
```
PAYSTACK_SECRET_KEY=sk_test_your_test_key_here
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_test_key_here
```

**Important:**
- Use `sk_test_` keys for testing (not `sk_live_`)
- Use `pk_test_` keys for testing (not `pk_live_`)
- These are your Paystack TEST keys from dashboard.paystack.com

### Step 3: Wait for Deployment

- Vercel will automatically deploy your changes
- Wait 1-2 minutes for deployment to complete
- Check Vercel dashboard for deployment status

### Step 4: Get Your Vercel URL

Your site will be at one of these URLs:
- **Production:** `https://your-project-name.vercel.app`
- **Preview:** `https://your-project-name-git-main-username.vercel.app`

### Step 5: Test Payment Flow

1. **Go to registration page:**
   ```
   https://your-project-name.vercel.app/register
   ```

2. **Fill out the form:**
   - Use real-looking test data
   - Use a valid email format
   - Complete all required fields

3. **Click "Pay Online with Paystack"**
   - Should redirect to Paystack checkout page
   - URL should be: `https://checkout.paystack.com/...`

4. **Use Paystack Test Card:**
   ```
   Card Number: 4084 0840 8408 4081
   CVV: 408
   Expiry: Any future date (e.g., 12/25)
   PIN: 0000
   OTP: 123456
   ```

5. **Complete Payment:**
   - Enter the test card details
   - Click "Pay"
   - Should redirect back to your site

6. **Verify Success:**
   - Should show "Verifying Payment..." message
   - Should redirect to success page
   - Should show receipt with payment details
   - Should be able to download PDF receipt

---

## Troubleshooting

### Problem: "Payment configuration error"
**Solution:**
- Environment variables not set in Vercel
- Go to Settings → Environment Variables
- Add PAYSTACK_SECRET_KEY
- Redeploy

### Problem: Payment doesn't redirect back
**Solution:**
- Check Vercel deployment logs
- Verify callback URL is correct
- Check browser console for errors

### Problem: "Invalid amount" error
**Solution:**
- Check the registration fee matches expected amount
- Verify amount is a number, not string
- Check api/initialize-payment.js validation

### Problem: Can't see deployment logs
**Solution:**
- Go to Vercel Dashboard
- Click on your project
- Click "Deployments"
- Click on latest deployment
- Click "Functions" tab to see API logs

---

## Testing Checklist

- [ ] Code committed and pushed
- [ ] Environment variables set in Vercel
- [ ] Deployment successful
- [ ] Can access site on Vercel URL
- [ ] Registration form loads
- [ ] Can click "Pay with Paystack"
- [ ] Redirects to Paystack checkout
- [ ] Can enter test card details
- [ ] Payment completes successfully
- [ ] Redirects back to your site
- [ ] Shows success page
- [ ] Can download receipt
- [ ] No errors in browser console

---

## Advantages of This Approach

1. **Real Environment Testing:**
   - Tests actual Paystack integration
   - Tests actual API routes
   - Tests actual redirect flow

2. **No Local Setup:**
   - No need to run local backend
   - No need to configure proxies
   - No need to install extra tools

3. **Free:**
   - Vercel free tier is generous
   - Unlimited deployments
   - Unlimited preview URLs

4. **Fast Iteration:**
   - Push code → Auto deploy → Test
   - Takes 1-2 minutes per iteration
   - Can test multiple times

5. **Shareable:**
   - Can share URL with others
   - Can test on different devices
   - Can test on mobile

---

## When to Switch to Option 2

Switch to Option 2 (local backend) if:
- You need to test very frequently (every few minutes)
- You want instant feedback without deploying
- You're debugging complex payment issues
- You need to see detailed API logs locally

But honestly, for most cases, testing on Vercel is faster and easier!

---

## Next Steps After Testing

Once payment works on Vercel:

1. **Switch to Live Keys:**
   - Go to Vercel → Settings → Environment Variables
   - Change `sk_test_` to `sk_live_`
   - Change `pk_test_` to `pk_live_`
   - Redeploy

2. **Test with Real Card:**
   - Use a real card with small amount (₦100)
   - Verify payment goes through
   - Check Paystack dashboard for transaction

3. **Go Live:**
   - Update your domain (if you have one)
   - Announce to users
   - Monitor for any issues

---

## Pro Tips

1. **Use Preview Deployments:**
   - Create a new branch for testing
   - Push to that branch
   - Vercel creates a preview URL
   - Test without affecting production

2. **Check Vercel Logs:**
   - Go to Functions tab in deployment
   - See API route logs
   - Debug issues faster

3. **Use Vercel CLI (Optional):**
   ```bash
   npm i -g vercel
   vercel dev
   ```
   - Runs Vercel environment locally
   - API routes work locally
   - Best of both worlds!

---

## Summary

**Option 3 is the best approach because:**
- ✅ No complex setup
- ✅ Tests real integration
- ✅ Free and fast
- ✅ Production-like environment

**Just:**
1. Push code
2. Wait 1-2 minutes
3. Test on Vercel URL
4. Iterate as needed

**That's it! Simple and effective! 🚀**
