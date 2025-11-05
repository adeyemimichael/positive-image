#!/bin/bash

echo "🏫 Deploying Positive Image Schools to Vercel..."
echo "================================================"

# Check if build works
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    npx vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "🌐 Your website is now live!"
    else
        echo "❌ Deployment failed. Please check the logs above."
    fi
else
    echo "❌ Build failed. Please fix the errors and try again."
fi