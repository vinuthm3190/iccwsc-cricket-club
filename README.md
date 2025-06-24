# 🏏 ICCWSC Cricket Club Website

[![Deploy to GitHub Pages](https://github.com/YOUR_USERNAME/iccwsc-cricket-club/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/iccwsc-cricket-club/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Indian Community Center Washington Cricket Club** - Official Website

A modern, responsive web application for managing cricket teams, players, and events for the Indian cricket community in Seattle, Washington.

## 🌟 Live Demo

🔗 **[View Live Website](https://YOUR_USERNAME.github.io/iccwsc-cricket-club/)**

## 🏏 Features

### 🎯 **Team Management**
- **ARCL Teams**: 8-player format, 16-over matches
- **NWCL Teams**: 11-player format (T10, T20, T40)
- **Categories**: Adult and Youth divisions
- **Statistics**: Win/loss records, run rates, player counts

### 👥 **Player Database**
- Comprehensive player profiles with statistics
- Advanced filtering by team, league, position, year, season
- Performance metrics (runs, wickets, matches played)
- Search functionality across all players

### 🎮 **Interactive Team Picker**
- Drag-and-drop player selection
- Cricket field visualization
- Formation-specific layouts (8 vs 11 players)
- Real-time team building interface

### 📅 **Event Scheduler**
- Calendar view for cricket events
- Practice sessions, matches, and team meetings
- Team assignment to events
- Location and time management

### 🔐 **Role-Based Access Control**
- **Guest**: View teams and players
- **Member**: Access scheduler and team assignments
- **Vice Captain**: Team picker and player management
- **Captain**: Full team and event management
- **Admin**: Complete system administration

### 📱 **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces
- Cross-platform compatibility

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern web browser

### Installation

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

## 🔐 Demo Login Credentials

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| **Admin** | `admin` | `pass123` | Full system access |
| **Captain** | `captain` | `pass123` | Team management |
| **Vice Captain** | `vice` | `pass123` | Team picker access |
| **Member** | `member` | `pass123` | Basic access |

## 🏗️ Project Structure

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

## 🎯 Cricket Leagues

### **ARCL (8 Players)**
- **Format**: 16-over matches
- **Category**: Adult
- **Teams**: Angry Bulls, Royal Warriors, Cereal Killers

### **NWCL (11 Players)**
- **Formats**: T10, T20, T40
- **Categories**: Adult and Youth
- **Teams**: Watermelons, Solaris

## 🛠️ Built With

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Automatic Deployment (GitHub Pages)
1. Push to main branch
2. GitHub Actions automatically builds and deploys
3. Site available at: `https://YOUR_USERNAME.github.io/iccwsc-cricket-club/`

### Manual Deployment
```bash
npm run build
npm run preview
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

We welcome contributions from the cricket community! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📚 Documentation

- 📖 [Setup Guide](SETUP.md) - Detailed installation and configuration
- 🚀 [Deployment Guide](DEPLOYMENT.md) - Hosting and deployment options
- 🤝 [Contributing](CONTRIBUTING.md) - How to contribute to the project
- 📋 [Changelog](CHANGELOG.md) - Version history and updates

## 🎨 Design Philosophy

### **Indian Cricket Heritage**
- Orange and green color scheme (inspired by Indian flag)
- Cricket-specific terminology and cultural elements
- Community-focused design approach

### **Modern Web Standards**
- Responsive design principles
- Accessibility considerations
- Performance optimization
- Progressive enhancement

## 🔮 Roadmap

- [ ] Backend API integration
- [ ] Real-time match scoring
- [ ] Player statistics import/export
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Tournament bracket management

## 📞 Contact

- **Website**: [ICCWSC Official](https://YOUR_USERNAME.github.io/iccwsc-cricket-club/)
- **Email**: info@iccwsc.com
- **Location**: Marymoor Park Cricket Ground, Redmond, WA

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Indian Community Center Washington for inspiration
- Seattle cricket community
- Open source contributors
- Cricket enthusiasts worldwide

---

**Made with ❤️ for the cricket community in Seattle** 🏏

[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/iccwsc-cricket-club?style=social)](https://github.com/YOUR_USERNAME/iccwsc-cricket-club/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/iccwsc-cricket-club?style=social)](https://github.com/YOUR_USERNAME/iccwsc-cricket-club/network/members)