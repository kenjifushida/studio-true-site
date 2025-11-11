# WordPress Webhook Setup for Automated Netlify Builds

This guide will set up automatic rebuilds of your Gatsby site on Netlify whenever you publish or update content in WordPress.

## Step 1: Create a Netlify Build Hook

1. **Go to your Netlify dashboard**: https://app.netlify.com
2. Select your site (studio-true-site)
3. Navigate to: **Site settings → Build & deploy → Build hooks**
4. Click **"Add build hook"**
5. Configure:
   - **Name**: `WordPress Content Update`
   - **Branch to build**: `master` (or your default branch)
6. Click **Save**
7. **Copy the webhook URL** - it looks like:
   ```
   https://api.netlify.com/build_hooks/xxxxxxxxxxxxxxxxxxxxxxxx
   ```
   **Keep this URL handy** - you'll need it in the next step!

## Step 2: Install a WordPress Webhook Plugin

You have two options. Choose **one** of the following:

### Option A: WP Webhooks (Recommended - Easier Setup)

1. **Log into your WordPress admin panel** at `https://studio-true.online/wp-admin`

2. **Install the plugin**:
   - Go to **Plugins → Add New**
   - Search for **"WP Webhooks"**
   - Click **Install Now** on **"WP Webhooks - Automation made easy"** by Ironikus
   - Click **Activate**

3. **Configure the webhook**:
   - Go to **Settings → WP Webhooks → Send Data**
   - Click **"Add webhook URL"**
   - Enter your Netlify build hook URL: `https://api.netlify.com/build_hooks/xxxxx`
   - Name it: `Netlify Build`
   - Click **Add**

4. **Set up triggers**:
   - Still in **Send Data**, find your webhook
   - Click **"Settings"** next to it
   - Under **"Webhook triggers"**, select:
     - ☑ `post_updated` - When a post is updated
     - ☑ `publish_post` - When a post is published
     - ☑ `publish_page` - When a page is published
   - Click **Save**

5. **Test the webhook**:
   - Click **"Send test"** button
   - Go to your Netlify dashboard and check **Deploys** - you should see a new build starting!

### Option B: JAMstack Deployments (Alternative)

1. **Log into your WordPress admin panel** at `https://studio-true.online/wp-admin`

2. **Install the plugin**:
   - Go to **Plugins → Add New**
   - Search for **"JAMstack Deployments"**
   - Click **Install Now** on **"JAMstack Deployments"** by Christopher Geary
   - Click **Activate**

3. **Configure the webhook**:
   - Go to **Settings → Deployments**
   - Under **"Build Hook URL"**, paste your Netlify build hook URL
   - Configure **"Triggers"**:
     - ☑ Publish Post
     - ☑ Update Post
     - ☑ Publish Page
     - ☑ Update Page
   - Click **Save Changes**

4. **Test the webhook**:
   - Click the **"Trigger Build"** button
   - Go to your Netlify dashboard and check **Deploys** - you should see a new build starting!

## Step 3: Commit Configuration Changes

Now that automatic builds are enabled, commit the updated netlify.toml:

```bash
git add netlify.toml WORDPRESS-WEBHOOK-SETUP.md
git commit -m "Enable automatic Netlify builds via WordPress webhooks"
git push origin master
```

## Step 4: Test the Complete Workflow

1. **Publish or update a post** in WordPress
2. **Check Netlify dashboard** (Deploys tab)
3. **You should see**:
   - A new build triggered with source: "Deploy Hook: WordPress Content Update"
   - Build progress
   - Site deployed after build completes (usually 3-5 minutes)

## Troubleshooting

### Webhook not triggering

1. **Check WordPress webhook logs**:
   - WP Webhooks: Go to **Settings → WP Webhooks → Logs**
   - JAMstack Deployments: Go to **Settings → Deployments → Deploy Log**

2. **Verify webhook URL is correct**:
   - It should start with `https://api.netlify.com/build_hooks/`
   - No extra spaces or characters

3. **Test manually**:
   ```bash
   curl -X POST -d {} https://api.netlify.com/build_hooks/YOUR_HOOK_ID
   ```
   This should trigger a build immediately.

### Build fails on Netlify

1. **Check build logs** in Netlify dashboard
2. **Common issues**:
   - Connection timeout to WordPress GraphQL: Hostinger firewall blocking Netlify
   - GraphQL errors: Check WordPress WPGraphQL plugin is active
   - Memory errors: Build might need more resources

3. **If firewall issues persist**, switch back to local builds:
   - See [DEPLOYMENT.md](DEPLOYMENT.md) for local build options
   - Use webhook-server.js for local automated builds

### Builds take too long

Netlify builds typically take 3-8 minutes. If longer:

1. **Check WordPress performance**:
   - Large number of posts/images?
   - Consider enabling WordPress caching

2. **Optimize gatsby-config.js**:
   - Already configured with optimal settings
   - `requestConcurrency: 2` and `perPage: 50`

## Architecture

```
WordPress Post Published
    ↓
WordPress Webhook Plugin
    ↓ (HTTPS POST)
Netlify Build Hook
    ↓
Netlify Build Server
    ↓ (GraphQL queries)
WordPress GraphQL API
    ↓
Gatsby Build (3-8 min)
    ↓
Deploy to Netlify CDN
    ↓
Site Updated! 🎉
```

## Security Notes

- **Build hook URL is secret**: Anyone with this URL can trigger builds
- **Don't commit build hook URL to git**: Keep it in WordPress plugin config only
- **Builds consume build minutes**: Free tier = 300 minutes/month
- **Consider rate limiting**: If you publish many posts at once, they'll trigger multiple builds

## Next Steps

1. ✅ Set up webhook (you're doing this now)
2. Consider installing `gatsby-plugin-netlify` for optimization
3. Monitor your Netlify build minutes usage
4. Set up deploy notifications (Netlify → Site settings → Build & deploy → Deploy notifications)

---

**Questions or issues?** Check the main [DEPLOYMENT.md](DEPLOYMENT.md) for alternative deployment methods.
