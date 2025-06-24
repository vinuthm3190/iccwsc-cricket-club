import React, { useState, useMemo } from 'react';
import { 
  PenTool, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Heart, 
  MessageCircle, 
  Clock, 
  Tag, 
  TrendingUp,
  Edit3,
  Trash2,
  Eye,
  Plus,
  BookOpen,
  Award,
  Target,
  Users,
  Trophy,
  Star,
  ChevronDown,
  ChevronUp,
  Send
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BlogPost, BlogComment, BlogFilters } from '../../types';

export default function Blog() {
  const { user, isAuthenticated } = useAuth();

  // Sample blog posts data
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'ICCWSC Dominates Summer League with Spectacular Victory',
      content: `What a match it was! Our Angry Bulls team showcased exceptional cricket skills in yesterday's match against the Seattle Strikers. The team's performance was nothing short of spectacular, with outstanding contributions from both batsmen and bowlers.

**Match Highlights:**

The match began with our captain winning the toss and choosing to bat first. Our opening pair got off to a flying start, putting up 50 runs in the first 6 overs. Rajesh Kumar played a magnificent innings, scoring 78 runs off just 45 balls, including 6 boundaries and 3 sixes.

**Bowling Excellence:**

Our bowling attack was equally impressive. Vikram Singh's spell of 4 wickets for 25 runs in his 4 overs was the highlight of our bowling performance. The team's fielding was sharp, with two brilliant run-outs that changed the momentum of the game.

**Team Spirit:**

What made this victory even more special was the team spirit displayed throughout the match. Every player contributed to the win, whether with the bat, ball, or in the field. This is what ICCWSC cricket is all about - playing as a unit and supporting each other.

**Looking Ahead:**

With this victory, we move to the top of the league table. Our next match is against the Redmond Royals next weekend. The team is confident and ready to continue this winning streak.

Come and support your team! Let's fill the stands with orange and green!`,
      excerpt: 'Our Angry Bulls team delivered a spectacular performance against Seattle Strikers, showcasing the true spirit of ICCWSC cricket with outstanding batting, bowling, and fielding.',
      author: {
        name: 'Rajesh Kumar',
        username: 'rajesh.kumar',
        role: 'captain'
      },
      category: 'match-report',
      tags: ['victory', 'summer-league', 'angry-bulls', 'team-performance'],
      publishedAt: new Date('2024-12-20T10:30:00'),
      isPublished: true,
      likes: 24,
      comments: [
        {
          id: '1',
          content: 'What an amazing match! So proud of our team. The batting was incredible and the bowling was spot on. Can\'t wait for the next game!',
          author: { name: 'Priya Sharma', username: 'priya.sharma', role: 'vice' },
          createdAt: new Date('2024-12-20T11:15:00'),
          likes: 8,
          replies: [
            {
              id: '2',
              content: 'Absolutely! The team coordination was perfect. Rajesh\'s innings was a treat to watch.',
              author: { name: 'Vikram Singh', username: 'vikram.singh', role: 'member' },
              createdAt: new Date('2024-12-20T11:30:00'),
              likes: 3,
              replies: []
            }
          ]
        },
        {
          id: '3',
          content: 'Brilliant performance by the entire team! The fielding was exceptional. Looking forward to more victories this season.',
          author: { name: 'Anita Patel', username: 'anita.patel', role: 'member' },
          createdAt: new Date('2024-12-20T12:00:00'),
          likes: 5,
          replies: []
        }
      ],
      readTime: 3,
      featuredImage: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Player Spotlight: Meera Gupta - Rising Star of Youth Cricket',
      content: `This month, we're excited to spotlight one of our most promising young cricketers - Meera Gupta. At just 16 years old, Meera has already made a significant impact in our youth cricket program and is quickly becoming a role model for aspiring young players.

**Cricket Journey:**

Meera started playing cricket at the age of 12 when her family moved to Seattle from Mumbai. "I was missing the cricket culture from India," says Meera. "Finding ICCWSC was like finding a second home where I could continue pursuing my passion for cricket."

**Outstanding Performance:**

In this season alone, Meera has scored 734 runs and taken 18 wickets across 27 matches. Her all-rounder capabilities make her an invaluable asset to the Watermelons Youth team. Her recent performance in the T10 youth league has been particularly impressive.

**Training and Dedication:**

"Meera is always the first to arrive at practice and the last to leave," says her coach. "Her dedication to improving her game is inspiring. She practices her batting for hours and works constantly on her bowling technique."

**Future Goals:**

When asked about her cricket aspirations, Meera says, "I want to represent ICCWSC at the highest level and maybe one day play for the Indian women's cricket team. But for now, I'm focused on helping my team win the youth championship."

**Advice for Young Players:**

Meera's advice to other young cricketers: "Never give up on your dreams. Cricket teaches you discipline, teamwork, and perseverance. These lessons go beyond the cricket field and help you in all aspects of life."

**Community Impact:**

Beyond her on-field performance, Meera volunteers to coach younger children in our community cricket programs. She believes in giving back to the community that has supported her cricket journey.

We're proud to have Meera as part of the ICCWSC family and look forward to watching her continued growth as a cricketer and leader.`,
      excerpt: 'Meet Meera Gupta, our 16-year-old cricket sensation who has scored 734 runs and taken 18 wickets this season while inspiring the next generation of young cricketers.',
      author: {
        name: 'Suresh Nair',
        username: 'suresh.nair',
        role: 'member'
      },
      category: 'player-spotlight',
      tags: ['youth-cricket', 'player-spotlight', 'inspiration', 'watermelons'],
      publishedAt: new Date('2024-12-18T14:20:00'),
      isPublished: true,
      likes: 31,
      comments: [
        {
          id: '4',
          content: 'Meera is such an inspiration! Her dedication to cricket and helping younger players is amazing. Keep up the great work!',
          author: { name: 'Kavya Iyer', username: 'kavya.iyer', role: 'member' },
          createdAt: new Date('2024-12-18T15:00:00'),
          likes: 12,
          replies: []
        }
      ],
      readTime: 4,
      featuredImage: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Cricket Training Tips: Mastering the Perfect Cover Drive',
      content: `The cover drive is often called the most beautiful shot in cricket. When executed perfectly, it's a sight to behold and an effective way to score runs. Today, we'll break down the technique to help you master this elegant stroke.

**The Setup:**

1. **Stance**: Start with a comfortable, balanced stance. Your feet should be shoulder-width apart, with your weight evenly distributed.

2. **Grip**: Ensure your grip is correct - the V formed by your thumb and forefinger should point between your shoulder and the off-stump.

3. **Backlift**: Keep your backlift straight and high, pointing towards the slips.

**The Execution:**

**Step 1: Watch the Ball**
The key to any good shot is watching the ball closely. Identify the length and line early.

**Step 2: Footwork**
For a cover drive, you need to get your front foot to the pitch of the ball. Step forward and across towards the line of the ball.

**Step 3: Head Position**
Keep your head still and over the ball. Your eyes should be level and focused on the point of contact.

**Step 4: The Drive**
Drive through the ball with a full face of the bat. Your hands should be ahead of the bat at the point of contact.

**Step 5: Follow Through**
Complete the shot with a full follow-through, finishing high and in the direction you want the ball to go.

**Common Mistakes to Avoid:**

- **Playing away from the body**: This leads to edges and catches
- **Not getting to the pitch**: Results in mistimed shots
- **Hard hands**: Keep your grip firm but not tight
- **Poor head position**: Leads to mistimed shots and edges

**Practice Drills:**

1. **Shadow Practice**: Practice the movement without a ball to get the muscle memory right
2. **Throw Downs**: Have someone throw balls at you to practice the timing
3. **Net Practice**: Regular net sessions focusing specifically on cover drives

**Mental Approach:**

Remember, the cover drive is a shot that requires patience. Don't try to hit every ball through covers. Wait for the right ball - typically a half-volley or full ball outside off-stump.

**Advanced Tips:**

- Vary your cover drives: straight drive, cover drive, and square drive
- Practice against different types of bowling: pace, spin, and swing
- Work on playing the shot both off front foot and back foot

**Conclusion:**

The cover drive is a shot that takes time to master, but with consistent practice and proper technique, it can become a reliable run-scoring option. Remember, cricket is about patience and technique, not just power.

Keep practicing, and soon you'll be playing cover drives like the pros!`,
      excerpt: 'Learn the art of cricket\'s most beautiful shot with our comprehensive guide to mastering the perfect cover drive, including technique, common mistakes, and practice drills.',
      author: {
        name: 'Arjun Reddy',
        username: 'arjun.reddy',
        role: 'member'
      },
      category: 'training-tips',
      tags: ['batting-technique', 'cover-drive', 'training', 'cricket-tips'],
      publishedAt: new Date('2024-12-15T09:45:00'),
      isPublished: true,
      likes: 18,
      comments: [
        {
          id: '5',
          content: 'Excellent breakdown of the cover drive technique! The step-by-step approach makes it easy to understand. Will definitely practice these tips.',
          author: { name: 'Rohit Sharma', username: 'rohit.sharma', role: 'member' },
          createdAt: new Date('2024-12-15T10:30:00'),
          likes: 6,
          replies: []
        }
      ],
      readTime: 5
    }
  ]);

  const [filters, setFilters] = useState<BlogFilters>({
    category: '',
    author: '',
    tag: '',
    search: '',
    sortBy: 'newest'
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general' as BlogPost['category'],
    tags: '',
    isPublished: true
  });

  // Blog categories with icons and colors
  const categories = [
    { id: 'match-report', name: 'Match Reports', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
    { id: 'player-spotlight', name: 'Player Spotlight', icon: Star, color: 'from-blue-500 to-cyan-500' },
    { id: 'team-news', name: 'Team News', icon: Users, color: 'from-green-500 to-emerald-500' },
    { id: 'training-tips', name: 'Training Tips', icon: Target, color: 'from-purple-500 to-pink-500' },
    { id: 'community', name: 'Community', icon: Heart, color: 'from-red-500 to-rose-500' },
    { id: 'general', name: 'General', icon: BookOpen, color: 'from-gray-500 to-slate-500' }
  ];

  // Calculate read time based on content length
  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Generate excerpt from content
  const generateExcerpt = (content: string, maxLength: number = 150): string => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesCategory = !filters.category || post.category === filters.category;
      const matchesAuthor = !filters.author || post.author.username === filters.author;
      const matchesTag = !filters.tag || post.tags.includes(filters.tag);
      const matchesSearch = !filters.search || 
        post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.content.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.author.name.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesCategory && matchesAuthor && matchesTag && matchesSearch && post.isPublished;
    });

    // Sort posts
    switch (filters.sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'trending':
        filtered.sort((a, b) => (b.likes + b.comments.length) - (a.likes + a.comments.length));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
    }

    return filtered;
  }, [blogPosts, filters]);

  // Get unique authors and tags for filters
  const getUniqueAuthors = () => {
    const authors = new Set<string>();
    blogPosts.forEach(post => authors.add(post.author.username));
    return Array.from(authors);
  };

  const getUniqueTags = () => {
    const tags = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  };

  // Handle post creation
  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in both title and content.');
      return;
    }

    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      excerpt: generateExcerpt(newPost.content),
      author: {
        name: user!.name,
        username: user!.username,
        role: user!.role
      },
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      publishedAt: new Date(),
      isPublished: newPost.isPublished,
      likes: 0,
      comments: [],
      readTime: calculateReadTime(newPost.content)
    };

    setBlogPosts(prev => [post, ...prev]);
    setShowAddPostModal(false);
    setNewPost({
      title: '',
      content: '',
      category: 'general',
      tags: '',
      isPublished: true
    });

    alert('Blog post created successfully!');
  };

  // Handle post editing
  const handleEditPost = (post: BlogPost) => {
    if (post.author.username !== user?.username && user?.role !== 'admin') {
      alert('You can only edit your own posts.');
      return;
    }
    setSelectedPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      isPublished: post.isPublished
    });
    setShowEditPostModal(true);
  };

  // Handle post update
  const handleUpdatePost = () => {
    if (!selectedPost || !newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in both title and content.');
      return;
    }

    setBlogPosts(prev => prev.map(post => 
      post.id === selectedPost.id 
        ? {
            ...post,
            title: newPost.title,
            content: newPost.content,
            excerpt: generateExcerpt(newPost.content),
            category: newPost.category,
            tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
            updatedAt: new Date(),
            isPublished: newPost.isPublished,
            readTime: calculateReadTime(newPost.content)
          }
        : post
    ));

    setShowEditPostModal(false);
    setSelectedPost(null);
    setNewPost({
      title: '',
      content: '',
      category: 'general',
      tags: '',
      isPublished: true
    });

    alert('Blog post updated successfully!');
  };

  // Handle post deletion
  const handleDeletePost = (postId: string, postTitle: string) => {
    const post = blogPosts.find(p => p.id === postId);
    if (post && post.author.username !== user?.username && user?.role !== 'admin') {
      alert('You can only delete your own posts.');
      return;
    }

    if (confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
      setBlogPosts(prev => prev.filter(post => post.id !== postId));
      alert('Blog post deleted successfully!');
    }
  };

  // Handle like post
  const handleLikePost = (postId: string) => {
    if (!isAuthenticated) {
      alert('Please log in to like posts.');
      return;
    }

    setBlogPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  // Handle add comment
  const handleAddComment = (postId: string) => {
    const commentContent = newComment[postId];
    if (!commentContent?.trim()) {
      alert('Please enter a comment.');
      return;
    }

    const comment: BlogComment = {
      id: Date.now().toString(),
      content: commentContent,
      author: {
        name: user!.name,
        username: user!.username,
        role: user!.role
      },
      createdAt: new Date(),
      likes: 0,
      replies: []
    };

    setBlogPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setNewComment(prev => ({ ...prev, [postId]: '' }));
  };

  // Get category info
  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[categories.length - 1];
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-400';
      case 'captain': return 'text-yellow-400';
      case 'vice': return 'text-blue-400';
      case 'member': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  // Get role badge
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'captain': return 'Captain';
      case 'vice': return 'Vice Captain';
      case 'member': return 'Member';
      default: return 'Guest';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cricket
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}Blog
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest cricket news, match reports, player spotlights, and training tips from the ICCWSC community.
          </p>
        </div>

        {/* Blog Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <BookOpen className="mx-auto mb-3 text-orange-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">{blogPosts.filter(p => p.isPublished).length}</div>
            <div className="text-white/70">Published Posts</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Heart className="mx-auto mb-3 text-red-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {blogPosts.reduce((total, post) => total + post.likes, 0)}
            </div>
            <div className="text-white/70">Total Likes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <MessageCircle className="mx-auto mb-3 text-blue-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {blogPosts.reduce((total, post) => total + post.comments.length, 0)}
            </div>
            <div className="text-white/70">Comments</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Users className="mx-auto mb-3 text-green-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {new Set(blogPosts.map(post => post.author.username)).size}
            </div>
            <div className="text-white/70">Contributors</div>
          </div>
        </div>

        {/* Filters and Add Post */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <Filter className="text-orange-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Filter & Search Posts</h2>
            </div>
            
            {isAuthenticated && (
              <button
                onClick={() => setShowAddPostModal(true)}
                className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Write New Post</span>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Search posts..."
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="bg-gray-900">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div>
              <select
                value={filters.author}
                onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Authors</option>
                {getUniqueAuthors().map(author => (
                  <option key={author} value={author} className="bg-gray-900">
                    {author}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div>
              <select
                value={filters.tag}
                onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Tags</option>
                {getUniqueTags().map(tag => (
                  <option key={tag} value={tag} className="bg-gray-900">
                    #{tag}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as BlogFilters['sortBy'] })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="newest" className="bg-gray-900">Newest First</option>
                <option value="oldest" className="bg-gray-900">Oldest First</option>
                <option value="popular" className="bg-gray-900">Most Liked</option>
                <option value="trending" className="bg-gray-900">Trending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Login Notice for Guests */}
        {!isAuthenticated && (
          <div className="bg-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 mb-8">
            <div className="flex items-center space-x-3 text-blue-300">
              <PenTool size={20} />
              <span className="font-semibold">Join the Conversation</span>
            </div>
            <p className="text-blue-200 mt-2">
              Log in to write blog posts, like posts, and join the discussion with fellow cricket enthusiasts.
            </p>
          </div>
        )}

        {/* Blog Posts */}
        <section>
          {filteredPosts.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 text-center">
              <BookOpen className="mx-auto mb-4 text-white/50" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">No Posts Found</h3>
              <p className="text-white/70 mb-6">
                No blog posts match your current filters. Try adjusting your search criteria.
              </p>
              {isAuthenticated && (
                <button
                  onClick={() => setShowAddPostModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
                >
                  Write the First Post
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => {
                const categoryInfo = getCategoryInfo(post.category);
                const CategoryIcon = categoryInfo.icon;
                const isExpanded = expandedPost === post.id;
                const canEdit = post.author.username === user?.username || user?.role === 'admin';

                return (
                  <article
                    key={post.id}
                    className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500"
                  >
                    {/* Post Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-10 h-10 bg-gradient-to-r ${categoryInfo.color} rounded-xl flex items-center justify-center`}>
                            <CategoryIcon className="text-white" size={20} />
                          </div>
                          <div>
                            <span className={`inline-block bg-gradient-to-r ${categoryInfo.color} px-3 py-1 rounded-full text-xs font-semibold text-white`}>
                              {categoryInfo.name}
                            </span>
                          </div>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                          {post.title}
                        </h2>
                        
                        <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                          <div className="flex items-center space-x-2">
                            <User size={16} />
                            <span className={getRoleColor(post.author.role)}>
                              {post.author.name}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${getRoleColor(post.author.role)} bg-white/10`}>
                              {getRoleBadge(post.author.role)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>{post.publishedAt.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock size={16} />
                            <span>{post.readTime} min read</span>
                          </div>
                        </div>
                      </div>

                      {/* Post Actions */}
                      {canEdit && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditPost(post)}
                            className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id, post.title)}
                            className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Featured Image */}
                    {post.featuredImage && (
                      <div className="mb-6">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-64 object-cover rounded-2xl"
                        />
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="mb-6">
                      <div className="text-white/90 leading-relaxed">
                        {isExpanded ? (
                          <div className="whitespace-pre-line">{post.content}</div>
                        ) : (
                          <div>{post.excerpt}</div>
                        )}
                      </div>
                      
                      {post.content.length > post.excerpt.length && (
                        <button
                          onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                          className="mt-4 text-orange-400 hover:text-orange-300 font-semibold flex items-center space-x-1 transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp size={16} />
                              <span>Show Less</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown size={16} />
                              <span>Read More</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                              onClick={() => setFilters({ ...filters, tag })}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Post Interactions */}
                    <div className="border-t border-white/20 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-6">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            disabled={!isAuthenticated}
                            className="flex items-center space-x-2 text-white/70 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Heart size={20} />
                            <span>{post.likes}</span>
                          </button>
                          <div className="flex items-center space-x-2 text-white/70">
                            <MessageCircle size={20} />
                            <span>{post.comments.length}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-white/70">
                          <Eye size={16} />
                          <span>View Post</span>
                        </div>
                      </div>

                      {/* Comments Section */}
                      {isAuthenticated && (
                        <div className="space-y-4">
                          {/* Add Comment */}
                          <div className="flex space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {user!.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 flex space-x-2">
                              <input
                                type="text"
                                value={newComment[post.id] || ''}
                                onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                                className="flex-1 px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Write a comment..."
                                onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                              />
                              <button
                                onClick={() => handleAddComment(post.id)}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                              >
                                <Send size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Comments List */}
                          {post.comments.length > 0 && (
                            <div className="space-y-3 pl-11">
                              {post.comments.map(comment => (
                                <div key={comment.id} className="bg-white/5 rounded-lg p-4">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                      {comment.author.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className={`font-semibold ${getRoleColor(comment.author.role)}`}>
                                      {comment.author.name}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs ${getRoleColor(comment.author.role)} bg-white/10`}>
                                      {getRoleBadge(comment.author.role)}
                                    </span>
                                    <span className="text-white/50 text-xs">
                                      {comment.createdAt.toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-white/90 text-sm">{comment.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Add Post Modal */}
        {showAddPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-4xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Write New Blog Post</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Post Title *</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter an engaging title for your post..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Category *</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value as BlogPost['category'] })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id} className="bg-gray-900">
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="cricket, match, victory, team..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Content *</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Write your blog post content here... You can use line breaks for paragraphs."
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={newPost.isPublished}
                    onChange={(e) => setNewPost({ ...newPost, isPublished: e.target.checked })}
                    className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400 focus:ring-2"
                  />
                  <label htmlFor="isPublished" className="text-white/90">
                    Publish immediately
                  </label>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowAddPostModal(false)}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {newPost.isPublished ? 'Publish Post' : 'Save Draft'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Post Modal */}
        {showEditPostModal && selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-4xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Edit Blog Post</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Post Title *</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter an engaging title for your post..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Category *</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value as BlogPost['category'] })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id} className="bg-gray-900">
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="cricket, match, victory, team..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Content *</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Write your blog post content here... You can use line breaks for paragraphs."
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="editIsPublished"
                    checked={newPost.isPublished}
                    onChange={(e) => setNewPost({ ...newPost, isPublished: e.target.checked })}
                    className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400 focus:ring-2"
                  />
                  <label htmlFor="editIsPublished" className="text-white/90">
                    Published
                  </label>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowEditPostModal(false);
                    setSelectedPost(null);
                    setNewPost({
                      title: '',
                      content: '',
                      category: 'general',
                      tags: '',
                      isPublished: true
                    });
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}