# 🚀 Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Fork/Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/iccwsc-cricket-club.git
   cd iccwsc-cricket-club
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

4. **Update Base URL**
   - Edit `vite.config.ts`
   - Change `base: '/iccwsc-cricket-club/'` to match your repository name

5. **Push to Main Branch**
   ```bash
   git add .
   git commit -m "Initial deployment setup"
   git push origin main
   ```

### Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build the project on every push to main
- Deploy to GitHub Pages
- Make the site available at: `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`

### Manual Deployment

For manual deployment:

```bash
# Build the project
npm run build

# Preview the build locally
npm run preview
```

### Environment Variables

No environment variables are required for the basic deployment. The app uses:
- Local storage for authentication
- Mock data for demonstration
- Static assets from Pexels

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public/` directory
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings

## Other Deployment Options

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel
1. Import your GitHub repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Deploy with default settings

### Traditional Web Hosting
1. Run `npm run build`
2. Upload the `dist/` folder contents to your web server
3. Configure server to serve `index.html` for all routes