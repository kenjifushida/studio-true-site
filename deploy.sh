#!/bin/bash

# Deploy script for Netlify
# This builds locally and deploys to Netlify, bypassing Hostinger firewall issues

echo "🏗️  Building site locally..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  echo "🚀 Deploying to Netlify..."
  netlify deploy --prod --dir=public
else
  echo "❌ Build failed. Please fix errors before deploying."
  exit 1
fi
