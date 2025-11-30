# Vercel Environment Variables Setup

## Your Deployed App
🚀 **Production URL**: https://positive-image-htewpxfef-adeyemimichaels-projects.vercel.app

## Required Environment Variables

You MUST add these environment variables to Vercel for the payment to work:

### Steps:

1. Go to: https://vercel.com/adeyemimichaels-projects/positive-image/settings/environment-variables

2. Add these three variables (one at a time):

   **Variable 1:**
   - Name: `PAYSTACK_SECRET_KEY`
   - Value: `sk_test_c8e5ee36c4e94479aada7f11f1708a0c03def283`
   - Environment: Production, Preview, Development (select all)

   **Variable 2:**
   - Name: `VITE_PAYSTACK_PUBLIC_KEY`
   - Value: `pk_test_d92f0b7317fce078078c0ff7c47c985ac2c6b42b`
   - Environment: Production, Preview, Development (select all)

   **Variable 3:**
   - Name: `VITE_APP_URL`
   - Value: `https://positive-image-htewpxfef-adeyemimichaels-projects.vercel.app`
   - Environment: Production, Preview, Development (select all)

3. After adding all variables, redeploy:
   ```bash
   npx vercel --prod
   ```

## Testing Payment

Once environment variables are set and redeployed:

1. Go to your live site
2. Navigate to Registration page
3. Fill out the form
4. Click "Pay Online with Paystack"
5. You should be redirected to Paystack payment page

## Troubleshooting

If payment still doesn't work:
- Check Vercel deployment logs: https://vercel.com/adeyemimichaels-projects/positive-image
- Verify environment variables are set correctly
- Make sure you redeployed after adding variables
