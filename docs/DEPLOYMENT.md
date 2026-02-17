# Deployment Guide

This guide provides instructions for deploying the Fire Detection System to various platforms.

## Prerequisites

- Git installed
- Node.js 18+ or Bun installed
- Roboflow API key (get from [Roboflow](https://roboflow.com))

## Environment Configuration

Before deploying, ensure you have the required environment variables configured:

```env
VITE_ROBOFLOW_API_KEY=your_api_key_here
VITE_ROBOFLOW_MODEL=fire-detection-model/version
VITE_MAX_FILE_SIZE=5242880
```

---

## Option 1: Vercel (Recommended - Easiest)

Vercel provides automatic deployments from GitHub with zero configuration.

### Steps:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Configure environment variables in project settings
   - Click "Deploy"

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add your environment variables
   - Redeploy if needed

**Automatic Deployments**: Every push to `main` triggers a new deployment.

---

## Option 2: Netlify

Netlify is another excellent option with similar features to Vercel.

### Steps:

1. **Create `netlify.toml` configuration**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod
   ```

3. **Or deploy via Git**
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables
   - Deploy

---

## Option 3: GitHub Pages

Deploy as a static site on GitHub Pages (free hosting).

### Steps:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**
   ```json
   {
     "homepage": "https://yourusername.github.io/firedetection",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update `vite.config.ts`**
   ```typescript
   export default defineConfig({
     base: '/firedetection/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to `gh-pages` branch
   - Save

---

## Option 4: Docker

Containerize the application for deployment anywhere.

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Deploy with Docker

```bash
# Build the image
docker build -t firedetection:latest .

# Run the container
docker run -d -p 80:80 firedetection:latest

# Or use docker-compose
docker-compose up -d
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_ROBOFLOW_API_KEY=${VITE_ROBOFLOW_API_KEY}
      - VITE_ROBOFLOW_MODEL=${VITE_ROBOFLOW_MODEL}
    restart: unless-stopped
```

---

## Option 5: AWS S3 + CloudFront

Deploy as a static website on AWS with CDN.

### Steps:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Create S3 bucket**
   ```bash
   aws s3 mb s3://firedetection-app
   ```

3. **Configure bucket for static hosting**
   ```bash
   aws s3 website s3://firedetection-app --index-document index.html --error-document index.html
   ```

4. **Upload files**
   ```bash
   aws s3 sync dist/ s3://firedetection-app --acl public-read
   ```

5. **Create CloudFront distribution** (optional but recommended)
   - Use AWS Console to create CloudFront distribution
   - Point to S3 bucket
   - Configure custom domain if needed

---

## Option 6: Self-Hosted (VPS/Dedicated Server)

Deploy on your own server using nginx or Apache.

### Using nginx:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Copy files to server**
   ```bash
   scp -r dist/* user@your-server:/var/www/firedetection
   ```

3. **Configure nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/firedetection;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Enable site and restart nginx**
   ```bash
   sudo ln -s /etc/nginx/sites-available/firedetection /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```

---

## Environment Variables for Production

Ensure these variables are set in your deployment platform:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_ROBOFLOW_API_KEY` | Your Roboflow API key | Yes |
| `VITE_ROBOFLOW_MODEL` | Model ID (e.g., fire-detection-g9ebb/8) | Yes |
| `VITE_MAX_FILE_SIZE` | Max upload size in bytes | No (default: 5MB) |

---

## Post-Deployment Checklist

- [ ] Test image upload functionality
- [ ] Verify fire detection works correctly
- [ ] Check that all assets load properly
- [ ] Test on mobile devices
- [ ] Verify environment variables are correctly set
- [ ] Check browser console for errors
- [ ] Test with various image sizes and formats
- [ ] Verify API rate limits are appropriate
- [ ] Set up monitoring/analytics (optional)
- [ ] Configure custom domain (optional)
- [ ] Set up HTTPS/SSL certificate

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `VITE_` prefix
- Rebuild after changing environment variables
- Check deployment platform's environment variable settings

### 404 Errors on Routes

- Ensure server is configured for SPA routing
- Add redirect rules (see platform-specific sections above)

### Slow Loading

- Enable gzip compression on server
- Use CDN (CloudFront, Cloudflare)
- Optimize images before uploading
- Check API response times

---

## Monitoring and Maintenance

### Performance Monitoring

Use tools like:
- Google Lighthouse
- WebPageTest
- GTmetrix

### Uptime Monitoring

Set up monitoring with:
- UptimeRobot
- Pingdom
- Better Uptime

### Analytics (Optional)

Add analytics to track usage:
- Google Analytics
- Plausible
- Fathom

---

**Need Help?** Open an issue on GitHub or contact the maintainer.

**Last Updated**: February 2025  
**Author**: Salim Tagemouati
