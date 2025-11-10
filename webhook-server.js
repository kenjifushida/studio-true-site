#!/usr/bin/env node

/**
 * Simple webhook server for WordPress content updates
 * Listens for POST requests and triggers deployment
 *
 * Usage:
 *   node webhook-server.js
 *   or
 *   pm2 start webhook-server.js --name "studio-true-webhook"
 *
 * Configure WordPress to POST to: http://your-server:3001/webhook
 */

const http = require('http');
const { exec } = require('child_process');
const path = require('path');

const PORT = process.env.WEBHOOK_PORT || 3001;
const SECRET = process.env.WEBHOOK_SECRET || 'change-this-secret';

// Prevent concurrent builds
let isBuilding = false;
let pendingBuild = false;

function runDeploy() {
  if (isBuilding) {
    console.log('Build already in progress, marking for retry...');
    pendingBuild = true;
    return;
  }

  isBuilding = true;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Starting deployment...`);

  const deployScript = path.join(__dirname, 'deploy.sh');

  exec(deployScript, (error, stdout, stderr) => {
    isBuilding = false;

    if (error) {
      console.error(`[${timestamp}] Deployment failed:`, error);
      console.error(stderr);
    } else {
      console.log(`[${timestamp}] Deployment completed successfully`);
      console.log(stdout);
    }

    // If another build was requested during this one, start it now
    if (pendingBuild) {
      pendingBuild = false;
      console.log('Running pending build...');
      setTimeout(runDeploy, 5000); // Wait 5 seconds before next build
    }
  });
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Webhook-Secret');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      // Verify secret if provided in header
      const providedSecret = req.headers['x-webhook-secret'];

      if (SECRET !== 'change-this-secret' && providedSecret !== SECRET) {
        console.log('Invalid webhook secret received');
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid secret' }));
        return;
      }

      console.log('Webhook received:', body.substring(0, 100));

      // Trigger deployment
      runDeploy();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Deployment triggered',
        building: isBuilding,
        pending: pendingBuild
      }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
  console.log(`POST to http://localhost:${PORT}/webhook to trigger deployment`);
  console.log(`Set WEBHOOK_SECRET environment variable for security`);
});
