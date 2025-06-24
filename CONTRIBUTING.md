# 🤝 Contributing to ICCWSC Cricket Club

Thank you for your interest in contributing to the Indian Community Center Washington Cricket Club website!

## 🏏 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/iccwsc-cricket-club.git
   cd iccwsc-cricket-club
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

## 🎯 Project Structure

```
src/
├── components/
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Header and navigation
│   └── Pages/          # Main application pages
├── context/            # React context for state management
├── types/              # TypeScript type definitions
└── main.tsx           # Application entry point
```

## 🔐 Demo Accounts

For testing authentication features:
- **Admin**: `admin` / `pass123`
- **Captain**: `captain` / `pass123` 
- **Vice Captain**: `vice` / `pass123`
- **Member**: `member` / `pass123`

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Use Lucide React for icons

### Component Guidelines
- Keep components focused and reusable
- Use proper TypeScript interfaces
- Include proper error handling
- Add loading states where appropriate

### Cricket-Specific Features
- **Teams**: Support for ARCL (8 players) and NWCL (11 players)
- **Leagues**: ARCL (16 overs), NWCL (T10, T20, T40)
- **Categories**: Adult and Youth divisions
- **Seasons**: Spring, Summer, Fall, Winter

## 📝 Making Changes

### Feature Development
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test thoroughly
4. Commit with descriptive messages
5. Push and create a pull request

### Bug Fixes
1. Create a bugfix branch: `git checkout -b bugfix/issue-description`
2. Fix the issue
3. Add tests if applicable
4. Submit a pull request

### Commit Message Format
```
type(scope): description

Examples:
feat(teams): add team statistics dashboard
fix(auth): resolve login validation issue
docs(readme): update installation instructions
style(players): improve player card hover effects
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Authentication flows work correctly
- [ ] All navigation links function properly
- [ ] Forms validate input correctly
- [ ] Responsive design works on mobile/tablet
- [ ] Cricket-specific features work as expected

### Browser Testing
Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📱 Responsive Design

Ensure all features work across:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🎨 Design Guidelines

### Color Scheme
- Primary: Orange to Green gradient (Indian flag inspired)
- Background: Blue to Purple gradient
- Text: White with various opacity levels
- Accents: Position-specific colors for cricket roles

### Typography
- Headings: Bold, large sizes with gradients
- Body: Clean, readable with proper contrast
- Interactive elements: Clear hover states

## 🏏 Cricket Features

### Team Management
- Support for multiple leagues and formats
- Player statistics tracking
- Team formation tools
- Season and year filtering

### User Roles
- **Guest**: View teams and players
- **Member**: Access scheduler
- **Vice Captain**: Team picker access
- **Captain**: Full team management
- **Admin**: User management

## 🚀 Deployment

The project uses GitHub Actions for automatic deployment to GitHub Pages. See `DEPLOYMENT.md` for detailed instructions.

## 📞 Getting Help

- Create an issue for bugs or feature requests
- Check existing issues before creating new ones
- Provide detailed information and steps to reproduce

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Indian Community Center Washington for inspiration
- Cricket community in Seattle
- Open source contributors