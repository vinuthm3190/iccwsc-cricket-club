# ICCWSC Cricket Club Website

Indian Community Center Washington Cricket Club - Official Website

## 🏏 Features

- **Team Management**: Comprehensive team roster with player statistics
- **Player Database**: Detailed player profiles with performance metrics
- **Team Picker**: Interactive drag-and-drop team selection (8 players for ARCL, 11 for NWCL)
- **Scheduler**: Event management with team assignments and locations
- **Authentication**: Role-based access (Captain, Vice Captain, Member)
- **Responsive Design**: Mobile-friendly interface

## 🚀 Live Demo

Visit the live website: [https://YOUR_USERNAME.github.io/iccwsc-cricket-club/](https://YOUR_USERNAME.github.io/iccwsc-cricket-club/)

## 🔐 Demo Login Credentials

- **Captain**: `captain` / `pass123` (Full access)
- **Vice Captain**: `vice` / `pass123` (Team management)
- **Member**: `member` / `pass123` (Limited access)

## 🛠️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/iccwsc-cricket-club.git
cd iccwsc-cricket-club
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build for Production

```bash
npm run build
```

## 📁 Project Structure

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

### ARCL (8 Players)
- 16-over format
- Adult category
- Teams: Angry Bulls, Royal Warriors, Cereal Killers

### NWCL (11 Players)
- Multiple formats: T10, T20, T40
- Adult and Youth categories
- Teams: Watermelons, Solaris

## 🔧 Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling
- **GitHub Pages** for hosting

## 📱 Features by Role

### Guest Users
- View teams and players
- Browse public information
- Contact form

### Members
- All guest features
- Access to scheduler
- View team assignments

### Vice Captains
- All member features
- Team picker access
- Player management

### Captains
- Full access to all features
- Complete team and player management
- Event scheduling with team assignments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

For questions about the cricket club, visit our contact page or reach out to:
- Email: info@iccwsc.com
- Location: Marymoor Park Cricket Ground, Redmond, WA