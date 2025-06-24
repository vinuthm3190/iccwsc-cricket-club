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
      color: 'from-red-500 to-pink-500',
      image: import.meta.env.BASE_URL + 'A_group_of_aspiring_cricket_players_shaking_hands_.png'
    },
    {
      icon: Users,
      title: 'All Skill Levels',
      description: 'Welcoming cricketers from beginners to seasoned players, fostering growth and friendship on the pitch.',
      color: 'from-blue-500 to-cyan-500',
      image: import.meta.env.BASE_URL + 'An_intense_cricket_match_in_progress,_with_a_batsm.png'
    },
    {
      icon: Trophy,
      title: 'Cricket Excellence',
      description: 'Competing in Pacific Northwest cricket leagues while upholding the spirit of cricket and sportsmanship.',
      color: 'from-yellow-500 to-orange-500',
      image: import.meta.env.BASE_URL + 'A_group_of_cricket_players_in_team_uniforms_celebr.png'
    },
    {
      icon: Calendar,
      title: 'Regular Matches',
      description: 'Weekly practice sessions, friendly matches, and tournament participation throughout the cricket season.',
      color: 'from-green-500 to-emerald-500',
      image: import.meta.env.BASE_URL + 'A_detailed_cricket_tournament_schedule_on_a_wooden.png'
    },
    {
      icon: Globe,
      title: 'Cultural Bridge',
      description: 'Connecting Indian cricket heritage with American sports culture, creating lasting bonds through cricket.',
      color: 'from-purple-500 to-indigo-500',
      image: import.meta.env.BASE_URL + 'A_professional_cricket_stadium_at_sunset,_with_bri.png'
    },
    {
      icon: Star,
      title: 'Youth Cricket',
      description: 'Developing young cricket talent and teaching the values of teamwork, discipline, and cricket ethics.',
      color: 'from-orange-500 to-red-500',
      image: import.meta.env.BASE_URL + 'A_group_of_aspiring_cricket_players_shaking_hands_.png'
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

  const handleViewTeams = () => {
    if (onNavigate) {
      onNavigate('teams');
    } else {
      alert('Explore our cricket teams! Visit the Teams page to see our ARCL and NWCL teams competing in various formats.');
    }
  };

  const handleViewPlayers = () => {
    if (onNavigate) {
      onNavigate('players');
    } else {
      alert('Meet our cricket players! Visit the Players page to see our talented cricketers and their statistics.');
    }
  };

  const handleViewScheduler = () => {
    if (onNavigate) {
      onNavigate('scheduler');
    } else {
      alert('Check our cricket schedule! Visit the Scheduler page to see upcoming matches and practice sessions.');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Responsive Cricket Background */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 text-center min-h-screen flex items-center overflow-hidden">
        {/* Responsive Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Mobile Background */}
          <div 
            className="absolute inset-0 sm:hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${import.meta.env.BASE_URL}hero_image.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          
          {/* Tablet Background */}
          <div 
            className="absolute inset-0 hidden sm:block lg:hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${import.meta.env.BASE_URL}hero_image.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          
          {/* Desktop Background */}
          <div 
            className="absolute inset-0 hidden lg:block"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('${import.meta.env.BASE_URL}hero_image.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            }}
          ></div>
        </div>

        {/* Additional Gradient Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 z-10"></div>
        
        {/* Content Container */}
        <div className="max-w-7xl mx-auto relative z-20 w-full">
          <div className="mb-6 sm:mb-8 lg:mb-12">
            {/* Main Heading - Responsive Typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
              <span className="block sm:inline">Indian Community Center</span>
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent block mt-2 sm:mt-0">
                Washington Cricket Club
              </span>
            </h1>
            
            {/* Subtitle - Responsive Text */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 drop-shadow-lg px-4 sm:px-0">
              Uniting the Indian community in Seattle through cricket, culture, and camaraderie. 
              Playing the gentleman's game with passion, pride, and the spirit of cricket.
            </p>
            
            {/* Location Badge - Responsive */}
            <div className="flex items-center justify-center space-x-2 text-white/80 mb-6 sm:mb-8 text-sm sm:text-base">
              <MapPin size={16} className="sm:w-5 sm:h-5" />
              <span className="drop-shadow-md">Seattle, Washington</span>
            </div>
          </div>
          
          {/* Call-to-Action Buttons - Responsive Layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <button 
              onClick={handleJoinCricketFamily}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-2xl backdrop-blur-sm"
            >
              Join Our Cricket Family
            </button>
            <button 
              onClick={handleLearnAboutCricket}
              className="w-full sm:w-auto bg-white/20 backdrop-blur-lg text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30 shadow-xl"
            >
              Learn About Cricket
            </button>
          </div>
        </div>

        {/* Floating Elements - Responsive Positioning */}
        <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-orange-500/20 rounded-full blur-xl animate-pulse z-10"></div>
        <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-green-500/20 rounded-full blur-xl animate-pulse delay-1000 z-10"></div>
        <div className="absolute top-32 sm:top-40 right-8 sm:right-20 w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500 z-10"></div>
        
        {/* Scroll Indicator - Hidden on Mobile */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block z-20">
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section with Stadium Background */}
      <section 
        className="py-12 sm:py-16 lg:py-20 px-4 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.9), rgba(67, 56, 202, 0.9)), url('${import.meta.env.BASE_URL}A_professional_cricket_stadium_at_sunset,_with_bri.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
            About
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}ICCWSC
            </span>
          </h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/20 mb-8 sm:mb-12">
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8">
              The Indian Community Center Washington Cricket Club (ICCWSC) was founded with a passion to bring 
              the beloved game of cricket to the Indian community in Seattle. We celebrate the rich tradition 
              of Indian cricket while building new memories in the beautiful Pacific Northwest.
            </p>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              More than just a cricket club, we're a family that connects generations through cricket. From 
              seasoned players who grew up playing gully cricket in India to young enthusiasts learning the 
              game for the first time, ICCWSC welcomes all who share our love for cricket and community.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section with Cricket Images */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Why Choose
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                {' '}ICCWSC Cricket
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              Discover what makes our cricket club the premier destination for Indian cricket enthusiasts in Seattle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105"
                >
                  {/* Feature Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        console.error('Image failed to load:', feature.image);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className={`absolute top-4 left-4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>

                  {/* Feature Content */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-4">
                      {feature.description}
                    </p>

                    {/* Feature CTA */}
                    <button
                      onClick={() => {
                        if (feature.title.includes('Community')) handleJoinCricketFamily();
                        else if (feature.title.includes('Excellence')) handleViewTeams();
                        else if (feature.title.includes('Skill')) handleViewPlayers();
                        else if (feature.title.includes('Matches')) handleViewScheduler();
                        else handleLearnAboutCricket();
                      }}
                      className={`w-full bg-gradient-to-r ${feature.color} text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm`}
                    >
                      {feature.title.includes('Community') ? 'Join Us' :
                       feature.title.includes('Excellence') ? 'View Teams' :
                       feature.title.includes('Skill') ? 'Meet Players' :
                       feature.title.includes('Matches') ? 'View Schedule' :
                       'Learn More'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Impact Stats with Victory Image Background */}
      <section 
        className="py-12 sm:py-16 lg:py-20 px-4 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(67, 56, 202, 0.85)), url('${import.meta.env.BASE_URL}A_group_of_cricket_players_in_team_uniforms_celebr.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Our Cricket
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                {' '}Community
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70">
              Numbers that showcase our commitment to cricket excellence in Seattle.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {communityImpact.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center border border-white/30 hover:border-white/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <Icon className="mx-auto mb-3 sm:mb-4 text-orange-400" size={32} />
                  <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 sm:mb-2">{stat.count}</div>
                  <div className="text-white/90 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{stat.title}</div>
                  <div className="text-white/70 text-xs sm:text-sm">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cricket Formats Section with Match Action Background */}
      <section 
        className="py-12 sm:py-16 lg:py-20 px-4 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.9), rgba(67, 56, 202, 0.9)), url('${import.meta.env.BASE_URL}An_intense_cricket_match_in_progress,_with_a_batsm.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Cricket
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                {' '}Formats We Play
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              From traditional Test matches to exciting T20s, we embrace all formats of the beautiful game.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 hover:border-white/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Trophy className="text-white" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">T20 Cricket</h3>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-4">
                Fast-paced, exciting 20-over matches perfect for weekend tournaments and league play. 
                Our most popular format for competitive cricket.
              </p>
              <button
                onClick={handleViewTeams}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm"
              >
                View T20 Teams
              </button>
            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 hover:border-white/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Calendar className="text-white" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">One Day Cricket</h3>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-4">
                Traditional 50-over format that combines strategy with endurance. Perfect for 
                special tournaments and inter-community matches.
              </p>
              <button
                onClick={handleViewScheduler}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm"
              >
                View Schedule
              </button>
            </div>

            <div className="bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/30 hover:border-white/50 transition-all duration-500 hover:transform hover:scale-105">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Practice Matches</h3>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-4">
                Regular practice sessions and friendly matches to improve skills, try new techniques, 
                and welcome newcomers to the game.
              </p>
              <button
                onClick={handleJoinCricketFamily}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-sm"
              >
                Join Practice
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Our Cricket
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                {' '}Values
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              The principles that guide our cricket community and shape our sporting culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-orange-500 to-green-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{value.title}</h3>
                      <p className="text-white/70 leading-relaxed text-sm sm:text-base">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section with Handshake Background */}
      <section 
        className="py-12 sm:py-16 lg:py-20 px-4 text-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.9), rgba(67, 56, 202, 0.9)), url('${import.meta.env.BASE_URL}A_group_of_aspiring_cricket_players_shaking_hands_.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/30">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Join Our Cricket Family
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Whether you're a cricket veteran or picking up a bat for the first time, there's a place 
              for you in our cricket community. Come play the game we all love in the heart of Seattle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={handleStartPlayingCricket}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-green-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-2xl"
              >
                Start Playing Cricket
              </button>
              <button 
                onClick={handleContactUs}
                className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30"
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