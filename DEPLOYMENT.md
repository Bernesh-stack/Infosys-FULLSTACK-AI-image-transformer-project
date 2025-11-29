# 🚀 Deployment Guide

## Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend)

#### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `client`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```
   - Deploy!

#### Backend Deployment (Render)

1. **Create render.yaml** in server directory:
   ```yaml
   services:
     - type: web
       name: ai-transformer-api
       env: node
       buildCommand: npm install && pip install -r transforms/requirements.txt
       startCommand: npm start
       envVars:
         - key: MONGODB_URI
           sync: false
         - key: JWT_SECRET
           sync: false
         - key: CLIENT_URL
           sync: false
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repository
   - Set root directory to `server`
   - Add environment variables:
     ```
     MONGODB_URI=<your-mongodb-atlas-uri>
     JWT_SECRET=<your-secret-key>
     CLIENT_URL=https://your-frontend.vercel.app
     PORT=5000
     ```
   - Deploy!

### Option 2: Railway (Full Stack)

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy Backend**
   ```bash
   cd server
   railway login
   railway init
   railway up
   ```

3. **Deploy Frontend**
   ```bash
   cd client
   railway init
   railway up
   ```

### Option 3: Heroku (Backend) + Netlify (Frontend)

#### Backend (Heroku)

1. **Create Procfile** in server directory:
   ```
   web: node server.js
   ```

2. **Deploy**
   ```bash
   cd server
   heroku create ai-transformer-api
   heroku config:set MONGODB_URI=<your-uri>
   heroku config:set JWT_SECRET=<your-secret>
   git push heroku main
   ```

#### Frontend (Netlify)

1. **Create netlify.toml** in client directory:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop `client/dist` folder
   - Or connect GitHub repository

## MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string
6. Replace in environment variables

## Environment Variables for Production

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-transformer
JWT_SECRET=your_production_secret_key_very_long_and_secure
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## Post-Deployment Checklist

- [ ] MongoDB Atlas is accessible
- [ ] Environment variables are set
- [ ] CORS is configured correctly
- [ ] Python dependencies are installed on server
- [ ] Static file serving works for uploads/outputs
- [ ] JWT secret is secure and unique
- [ ] API endpoints are accessible
- [ ] Frontend can connect to backend
- [ ] Image upload works
- [ ] Transformations work
- [ ] History is saved correctly

## Performance Optimization

1. **Enable Compression**
   ```javascript
   const compression = require('compression')
   app.use(compression())
   ```

2. **Add Caching**
   ```javascript
   app.use(express.static('uploads', { maxAge: '1d' }))
   ```

3. **Use CDN** for static assets

4. **Optimize Images** before transformation

5. **Add Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit')
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   })
   app.use('/api/', limiter)
   ```

## Monitoring

- Use **Sentry** for error tracking
- Use **LogRocket** for session replay
- Monitor API response times
- Track transformation success rates

## Backup Strategy

1. **MongoDB**: Enable automated backups in Atlas
2. **Images**: Store in cloud storage (AWS S3, Cloudinary)
3. **Code**: Keep in GitHub with proper versioning

## Security Checklist

- [ ] Use HTTPS only
- [ ] Secure JWT secret
- [ ] Validate all inputs
- [ ] Sanitize file uploads
- [ ] Rate limit API endpoints
- [ ] Use helmet.js for security headers
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for trusted domains
- [ ] Implement proper error handling

## Scaling Considerations

1. **Horizontal Scaling**: Deploy multiple backend instances
2. **Load Balancing**: Use Nginx or cloud load balancer
3. **Queue System**: Use Bull/Redis for image processing
4. **Caching**: Implement Redis for session/data caching
5. **CDN**: Use Cloudflare or AWS CloudFront
6. **Database**: Use MongoDB replica sets

## Cost Estimation

### Free Tier (Development)
- Vercel: Free
- Render: Free (with limitations)
- MongoDB Atlas: Free (512MB)
- **Total: $0/month**

### Production (Small Scale)
- Vercel Pro: $20/month
- Render Standard: $7/month
- MongoDB Atlas M10: $57/month
- **Total: ~$84/month**

### Production (Medium Scale)
- Vercel Pro: $20/month
- Render Pro: $25/month
- MongoDB Atlas M20: $115/month
- AWS S3: $5/month
- **Total: ~$165/month**

## Troubleshooting Deployment

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Python Scripts Don't Work
- Ensure Python is available in deployment environment
- Check if OpenCV can be installed
- Consider using Docker for consistent environment

### Database Connection Fails
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure network access is configured

### CORS Errors
- Update CLIENT_URL in backend .env
- Check CORS configuration in server.js
- Verify frontend URL is correct

## Support

For deployment issues:
1. Check deployment platform documentation
2. Review application logs
3. Test API endpoints with Postman
4. Verify environment variables
5. Check database connectivity

Good luck with your deployment! 🚀
