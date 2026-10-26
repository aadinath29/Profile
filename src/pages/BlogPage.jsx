import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import BlogCard from '../components/sections/blog/BlogCard';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Backend Architecture',
    'Frontend Engineering',
    'Creative Engineering',
    'Security & Database',
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 sm:space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-[#C4704A] bg-[#C4704A]/10 border border-[#C4704A]/25">
          <BookOpen className="w-3.5 h-3.5 text-[#C4704A]" />
          <span>WRITING &bull; DEV LOGS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-text-primary tracking-tight">
          Writing.
        </h1>

        <p className="text-base sm:text-lg italic text-text-secondary leading-relaxed font-sans">
          Thoughts on building, learning, and shipping.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-2">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#C4704A] text-white font-medium'
                  : 'bg-surface border border-border text-text-muted hover:text-text-primary hover:border-[#C4704A]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search articles or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full text-xs font-mono bg-surface border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[#C4704A] transition-colors"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post, idx) => (
            <BlogCard key={post.id} post={post} index={idx} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-border bg-surface/30 space-y-3">
          <p className="text-text-muted font-mono text-sm">No articles match your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-mono text-[#C4704A] underline hover:text-[#A85C38]"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
