# Deployment Guide for Studio True Site

This Gatsby site pulls content from WordPress at `https://studio-true.online/graphql`. Due to Hostinger firewall restrictions blocking Netlify's build servers, we use **local builds** with **static file deployment**.

## Quick Start

### Manual Deployment (Immediate)

```bash
# One-time setup
npm install -g netlify-cli
netlify login
netlify link

# Deploy
./deploy.sh
```

## Automated Deployment Options

### Option 1: Scheduled Builds (Recommended for Simple Setup)

Automatically rebuild and deploy every X hours using cron.

**Setup:**

1. Make sure you're authenticated with Netlify:
   ```bash
   netlify login
   ```

2. Edit your crontab:
   ```bash
   crontab -e
   ```

3. Add this line (rebuilds every 6 hours):
   ```
   0 */6 * * * /Users/kenjifushida/Documents/dev/studio-true-site/deploy-cron.sh
   ```

   Other schedules:
   - Every 2 hours: `0 */2 * * *`
   - Every day at 2am: `0 2 * * *`
   - Every 30 minutes: `*/30 * * * *`

**Pros:**
- Simple setup
- No extra dependencies
- Works reliably

**Cons:**
- Not instant (updates on schedule)
- Runs even when no content changes

### Option 2: Webhook Server (Recommended for Instant Updates)

Run a webhook server that listens for WordPress updates and triggers immediate deployment.

**Setup:**

1. Start the webhook server:
   ```bash
   # With custom secret for security
   WEBHOOK_SECRET=your-secret-here node webhook-server.js

   # Or use PM2 for persistent background process
   npm install -g pm2
   WEBHOOK_SECRET=your-secret-here pm2 start webhook-server.js --name studio-true-webhook
   ```

2. Configure port forwarding or use ngrok for external access:
   ```bash
   # If running locally, use ngrok to expose webhook
   npx ngrok http 3001
   ```

3. Install WordPress webhook plugin:
   - Install "JAMstack Deployments" or "WP Webhooks" plugin
   - Configure webhook URL: `http://your-server:3001/webhook`
   - Add header: `X-Webhook-Secret: your-secret-here`
   - Trigger on: Post Published, Post Updated

**Pros:**
- Instant deployment when content changes
- Only builds when needed
- Efficient

**Cons:**
- Requires running server
- Need to expose webhook endpoint to internet

### Option 3: Netlify Build Hooks (If Firewall is Resolved)

If you resolve the Hostinger firewall issue, you can use Netlify's native build hooks.

**Setup:**

1. Update [netlify.toml](netlify.toml) to enable server-side builds:
   ```toml
   [build]
     command = "npm run build"
     publish = "public"
   ```

2. Create Netlify build hook:
   - Go to Netlify dashboard → Site settings → Build & deploy → Build hooks
   - Create hook, copy URL

3. Install WordPress plugin (WPGatsby or JAMstack Deployments)
   - Configure to POST to Netlify build hook URL

**Pros:**
- Fully automated
- No local server needed
- Netlify's CDN handles everything

**Cons:**
- Requires resolving Hostinger firewall issue
- Longer build times on Netlify servers

## Troubleshooting

### Build fails locally

Check that you can access WordPress:
```bash
curl https://studio-true.online/graphql
```

Should return:
```json
{"errors":[{"message":"GraphQL Request must include at least one of those two parameters: \"query\" or \"queryId\""}]}
```

### Netlify CLI not authenticated

```bash
netlify login
```

### Deployment fails

Check logs:
```bash
# If using cron
tail -f ~/studio-true-deploy.log

# If using webhook server with PM2
pm2 logs studio-true-webhook
```

### WordPress changes not reflecting

- **Scheduled builds**: Wait for next scheduled run
- **Webhook**: Check webhook server logs, verify WordPress plugin is sending requests
- **Manual**: Run `./deploy.sh` manually

## Scripts Reference

| Script | Purpose | Usage |
|--------|---------|-------|
| [deploy.sh](deploy.sh) | Manual deployment | `./deploy.sh` |
| [deploy-cron.sh](deploy-cron.sh) | Scheduled deployment | Add to crontab |
| [webhook-server.js](webhook-server.js) | Webhook listener | `node webhook-server.js` |

## Architecture

```
WordPress (Hostinger)
    ↓ (GraphQL)
Local Build (Gatsby)
    ↓ (Static files)
Netlify CDN
    ↓ (HTTPS)
Users
```

**Why this approach:**
- Hostinger firewall blocks Netlify build servers
- Local machine can access WordPress GraphQL endpoint
- Build locally, deploy static files to Netlify
- Netlify serves pre-built site via CDN
