#!/bin/bash

# Automated deployment script for cron
# Add to crontab: 0 */6 * * * /path/to/deploy-cron.sh
# This runs every 6 hours

cd /Users/kenjifushida/Documents/dev/studio-true-site

# Log file
LOG_FILE="$HOME/studio-true-deploy.log"

echo "====================================" >> "$LOG_FILE"
echo "Deployment started: $(date)" >> "$LOG_FILE"

# Clean and build
npm run clean >> "$LOG_FILE" 2>&1
npm run build >> "$LOG_FILE" 2>&1

if [ $? -eq 0 ]; then
  echo "Build successful, deploying..." >> "$LOG_FILE"
  netlify deploy --prod --dir=public >> "$LOG_FILE" 2>&1
  echo "Deployment completed: $(date)" >> "$LOG_FILE"
else
  echo "Build failed: $(date)" >> "$LOG_FILE"
fi

echo "====================================" >> "$LOG_FILE"
