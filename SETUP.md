# 🏏 ICCWSC Cricket Club - Setup Guide

## 📋 Quick Start

### Prerequisites
- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/iccwsc-cricket-club.git
   cd iccwsc-cricket-club
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically reload when you make changes

## 🔐 Demo Accounts

Use these accounts to test different permission levels:

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| **Admin** | `admin` | `pass123` | Full system access |
| **Captain** | `captain` | `pass123` | Team management |
| **Vice Captain** | `vice` | `pass123` | Team picker access |
| **Member** | `member` | `pass123` | Basic access |

## 🏗️ Project Structure

```
iccwsc-cricket-club/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Auth/          # Login/authentication
│   │   ├── Layout/        # Header, navigation
│   │   └── Pages/         # Main application pages
│   ├── context/           # React context (auth)
│   ├── types/             # TypeScript definitions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── .github/workflows/     # GitHub Actions
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
└── tailwind.config.js     # Tailwind CSS config
```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Deployment
npm run deploy       # Build and deploy to GitHub Pages
```

## 🏏 Cricket Features Overview

### **Team Management**
- **ARCL Teams**: 8 players, 16-over format
- **NWCL Teams**: 11 players, T10/T20/T40 formats
- **Categories**: Adult and Youth divisions
- **Seasons**: Spring, Summer, Fall, Winter

### **User Roles & Permissions**

#### **Guest Users**
- ✅ View teams and players
- ✅ Browse public information
- ✅ Contact form access

#### **Members**
- ✅ All guest features
- ✅ Event scheduler access
- ✅ Team assignment viewing

#### **Vice Captains**
- ✅ All member features
- ✅ Team picker tool
- ✅ Player management

#### **Captains**
- ✅ All vice captain features
- ✅ Full team management
- ✅ Event creation with team assignments

#### **Admins**
- ✅ Full system access
- ✅ User account management
- ✅ Role assignment
- ✅ System configuration

## 🎨 Customization

### **Branding**
- Update `index.html` title and meta tags
- Modify color scheme in `tailwind.config.js`
- Replace logo and favicon in `public/` directory

### **Cricket Data**
- Player data: `src/components/Pages/Players.tsx`
- Team data: `src/components/Pages/Teams.tsx`
- Event data: `src/components/Pages/Scheduler.tsx`

### **Styling**
- Global styles: `src/index.css`
- Component styles: Tailwind classes in components
- Custom animations: CSS transitions and transforms

## 🚀 Deployment Options

### **GitHub Pages (Recommended)**
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. GitHub Actions will automatically deploy

### **Netlify**
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### **Vercel**
1. Import GitHub repository to Vercel
2. Vercel auto-detects Vite configuration
3. Deploy with default settings

## 🔧 Configuration

### **Base URL Configuration**
For GitHub Pages deployment, update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repository-name/',
  // ... other config
});
```

### **Environment Variables**
Currently, no environment variables are required. The app uses:
- Local storage for authentication
- Mock data for demonstration
- Static assets from CDN

## 📱 Browser Support

### **Desktop**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### **Mobile**
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 15+

## 🐛 Troubleshooting

### **Common Issues**

#### **Port Already in Use**
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use different port
npm run dev -- --port 3000
```

#### **Node Version Issues**
```bash
# Check Node version
node --version
# Should be 18 or higher
```

#### **Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **Deployment Issues**
- Check `base` URL in `vite.config.ts`
- Verify GitHub Pages is enabled
- Check GitHub Actions logs

### **Performance Optimization**
- Images are loaded from CDN (Pexels)
- Code splitting with React.lazy (if needed)
- Tailwind CSS purging for smaller bundle size

## 📞 Support

### **Getting Help**
- 📧 Create GitHub issue for bugs
- 💬 Check existing issues first
- 📖 Review documentation
- 🔍 Search community discussions

### **Contributing**
- Read `CONTRIBUTING.md` for guidelines
- Follow code style conventions
- Test changes thoroughly
- Submit pull requests with clear descriptions

## 🎯 Next Steps

1. **Customize for Your Club**
   - Update team names and player data
   - Modify branding and colors
   - Add your club's specific rules

2. **Deploy to Production**
   - Choose deployment platform
   - Configure custom domain (optional)
   - Set up monitoring

3. **Enhance Features**
   - Add backend API integration
   - Implement real-time features
   - Add advanced analytics

Happy cricket coding! 🏏✨