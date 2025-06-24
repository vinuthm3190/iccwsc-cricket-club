import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@iccwsc.com', 'cricket@iccwsc.com'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (206) 555-CRICKET', '+1 (206) 555-0123'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Find Us',
      details: ['Marymoor Park Cricket Ground', 'Redmond, WA 98052'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Clock,
      title: 'Practice Hours',
      details: ['Weekends: 9:00 AM - 6:00 PM', 'Weekdays: 6:00 PM - 8:00 PM'],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Hero Section with Handshake Background */}
      <section 
        className="relative py-16 px-4 text-center mb-16 rounded-3xl overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.9), rgba(67, 56, 202, 0.9)), url('/A_group_of_aspiring_cricket_players_shaking_hands_.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}Touch
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Ready to join our cricket family? Have questions about our club or want to learn more about cricket? 
            We'd love to hear from you and welcome you to the ICCWSC community.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-white/70 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center space-x-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-green-300">Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${errors.name ? 'border-red-500' : 'border-white/30'} rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-red-400 text-sm">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/30'} rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.subject ? 'border-red-500' : 'border-white/30'} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all`}
                >
                  <option value="" className="bg-gray-900">Select a subject</option>
                  <option value="membership" className="bg-gray-900">Cricket Membership</option>
                  <option value="beginner" className="bg-gray-900">New to Cricket</option>
                  <option value="tournament" className="bg-gray-900">Tournament Information</option>
                  <option value="coaching" className="bg-gray-900">Cricket Coaching</option>
                  <option value="general" className="bg-gray-900">General Inquiry</option>
                  <option value="other" className="bg-gray-900">Other</option>
                </select>
                {errors.subject && <p className="mt-1 text-red-400 text-sm">{errors.subject}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.message ? 'border-red-500' : 'border-white/30'} rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none`}
                  placeholder="Tell us about your cricket interests or questions..."
                ></textarea>
                {errors.message && <p className="mt-1 text-red-400 text-sm">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Info Section with Stadium Background */}
          <div className="space-y-8">
            <div 
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 relative overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(67, 56, 202, 0.8)), url('/A_professional_cricket_stadium_at_sunset,_with_bri.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6">Why Join ICCWSC?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Authentic Cricket Experience</h4>
                      <p className="text-white/70 text-sm">Play cricket the way it's meant to be played with proper equipment and grounds.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Cultural Community</h4>
                      <p className="text-white/70 text-sm">Connect with fellow Indians who share your passion for cricket and culture.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">All Skill Levels Welcome</h4>
                      <p className="text-white/70 text-sm">From beginners to seasoned players, everyone has a place in our cricket family.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className="bg-gradient-to-br from-orange-500/20 to-green-500/20 backdrop-blur-lg rounded-3xl p-8 border border-white/30 relative overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(67, 56, 202, 0.7)), url('/An_intense_cricket_match_in_progress,_with_a_batsm.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Play Cricket?</h3>
                <p className="text-white/80 mb-6">
                  Join our cricket community and experience the joy of playing the gentleman's game in the heart of Seattle.
                </p>
                <button className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                  Join ICCWSC Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}