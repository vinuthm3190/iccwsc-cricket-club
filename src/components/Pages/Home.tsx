import React from 'react';
import { Heart, Users, Trophy, Calendar, Globe, Star, MapPin, Handshake } from 'lucide-react';

interface HomeProps {
  onNavigate?: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: Heart,
      title: 'Cricket Community',
      description: 'Bringing together Indian families in Seattle through the gentleman\'s game and cultural connection.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'All Skill Levels',
      description: 'Welcoming cricketers from beginners to seasoned players, fostering growth and friendship on the pitch.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Trophy,
      title: 'Cricket Excellence',
      description: 'Competing in Pacific Northwest cricket leagues while upholding the spirit of cricket and sportsmanship.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Calendar,
      title: 'Regular Matches',
      description: 'Weekly practice sessions, friendly matches, and tournament participation throughout the cricket season.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Cultural Bridge',
      description: 'Connecting Indian cricket heritage with American sports culture, creating lasting bonds through cricket.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Star,
      title: 'Youth Cricket',
      description: 'Developing young cricket talent and teaching the values of teamwork, discipline, and cricket ethics.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const communityImpact = [
    {
      icon: Users,
      title: 'Active Cricketers',
      count: '120+',
      description: 'Players across all formats'
    },
    {
      icon: Trophy,
      title: 'Tournaments Won',
      count: '18+',
      description: 'Local and regional cricket championships'
    },
    {
      icon: Calendar,
      title: 'Matches Played',
      count: '200+',
      description: 'Cricket matches annually'
    },
    {
      icon: Heart,
      title: 'Years Playing',
      count: '15+',
      description: 'Serving Seattle\'s cricket community'
    }
  ];

  const values = [
    {
      icon: Handshake,
      title: 'Spirit of Cricket',
      description: 'We uphold the traditional values of cricket - fair play, respect for opponents, and playing within the spirit of the game.'
    },
    {
      icon: Heart,
      title: 'Indian Cricket Heritage',
      description: 'Celebrating the rich tradition of Indian cricket while embracing the diversity of the Pacific Northwest cricket community.'
    },
    {
      icon: Users,
      title: 'Cricket Family',
      description: 'Building strong bonds within the Indian cricket community and creating a supportive environment for all players.'
    },
    {
      icon: Star,
      title: 'Cricket Excellence',
      description: 'Striving for continuous improvement in our cricket skills while fostering personal growth and team spirit.'
    }
  ];

  const handleJoinCricketFamily = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      // Fallback for when onNavigate is not available
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If no contact section, show alert with contact info
        alert('Ready to join our cricket family? Contact us at info@iccwsc.com or visit our Contact page for more information!');
      }
    }
  };

  const handleLearnAboutCricket = () => {
    if (onNavigate) {
      onNavigate('teams');
    } else {
      // Fallback - scroll to features section
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Show cricket info
        alert('Cricket is the gentleman\'s game! Explore our Teams page to learn about different formats: T10, T20, T40, and 16-over matches. We welcome players of all skill levels!');
      }
    }
  };

  const handleStartPlayingCricket = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      alert('Ready to start playing cricket? Contact us at info@iccwsc.com or call +1 (206) 555-CRICKET to join our cricket community!');
    }
  };

  const handleContactUs = () => {
    if (onNavigate) {
      onNavigate('contact');
    } else {
      alert('Contact ICCWSC:\n\nEmail: info@iccwsc.com\nPhone: +1 (206) 555-CRICKET\nLocation: Marymoor Park Cricket Ground, Redmond, WA\n\nVisit our Contact page for more details!');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Cricket Background Image */}
      <section 
        className="relative py-32 px-4 text-center min-h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://raw.githubusercontent.com/vinuthm3190/iccwsc-cricket-club/refs/heads/main/public/images/hero_image.png?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-indigo-900/30"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Indian Community Center
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent block">
                Washington Cricket Club
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 drop-shadow-lg">
              Uniting the Indian community in Seattle through cricket, culture, and camaraderie. 
              Playing the gentleman's game with passion, pride, and the spirit of cricket.
            </p>
            <div className="flex items-center justify-center space-x-2 text-white/80 mb-8">
              <MapPin size={20} />
              <span className="drop-shadow-md">Seattle, Washington</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleJoinCricketFamily}
              className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-2xl backdrop-blur-sm"
            >
              Join Our Cricket Family
            </button>
            <button 
              onClick={handleLearnAboutCricket}
              className="bg-white/20 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30 shadow-xl"
            >
              Learn About Cricket
            </button>
          </div>
        </div>

        {/* Floating elements with Indian flag colors */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            About
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}ICCWSC
            </span>
          </h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 mb-12">
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              The Indian Community Center Washington Cricket Club (ICCWSC) was founded with a passion to bring 
              the beloved game of cricket to the Indian community in Seattle. We celebrate the rich tradition 
              of Indian cricket while building new memories in the beautiful Pacific Northwest.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              More than just a cricket club, we're a family that connects generations through cricket. From 
              seasoned players who grew up playing gully cricket in India to young enthusiasts learning the 
              game for the first time, ICCWSC welcomes all who share our love for cricket and community.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                {' '}ICCWSC Cricket
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover what makes our cricket club the premier destination for Indian cricket enthusiasts in Seattle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Impact Stats */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Cricket
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                {' '}Community
              </span>
            </h2>
            <p className="text-xl text-white/70">
              Numbers that showcase our commitment to cricket excellence in Seattle.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityImpact.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <Icon className="mx-auto mb-4 text-orange-400" size={40} />
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.count}</div>
                  <div className="text-white/70 font-semibold mb-2">{stat.title}</div>
                  <div className="text-white/60 text-sm">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cricket Formats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cricket
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                {' '}Formats We Play
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From traditional Test matches to exciting T20s, we embrace all formats of the beautiful game.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Trophy className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">T20 Cricket</h3>
              <p className="text-white/70 leading-relaxed">
                Fast-paced, exciting 20-over matches perfect for weekend tournaments and league play. 
                Our most popular format for competitive cricket.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">One Day Cricket</h3>
              <p className="text-white/70 leading-relaxed">
                Traditional 50-over format that combines strategy with endurance. Perfect for 
                special tournaments and inter-community matches.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Practice Matches</h3>
              <p className="text-white/70 leading-relaxed">
                Regular practice sessions and friendly matches to improve skills, try new techniques, 
                and welcome newcomers to the game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Cricket
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                {' '}Values
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The principles that guide our cricket community and shape our sporting culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-white/70 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500/20 to-green-500/20 backdrop-blur-lg rounded-3xl p-12 border border-white/30">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Cricket Family
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Whether you're a cricket veteran or picking up a bat for the first time, there's a place 
              for you in our cricket community. Come play the game we all love in the heart of Seattle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleStartPlayingCricket}
                className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-2xl"
              >
                Start Playing Cricket
              </button>
              <button 
                onClick={handleContactUs}
                className="bg-white/20 backdrop-blur-sm text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
