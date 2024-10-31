import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, X, User, History, Tag, Inbox, Settings, LogOut, LogIn, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsSearchActive(true);
        setIsAnimating(false);
      }, 300);
    }
  };

  const resetSearch = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSearchQuery('');
      setIsSearchActive(false);
      setIsAnimating(false);
    }, 300);
  };

  const handleLogInOut = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsProfileOpen(false);
  };

  const suggestions = [
    { id: 1, label: "💻 Laptops", query: "Where can I get a new macbook pro 14'" },
    { id: 2, label: "🎸 Guitars", query: "Electric guitar deals" },
    { id: 3, label: "👟 Shoes", query: "shoe deals" },
    { id: 4, label: "🍤 Tempura", query: "tempura dishes" },
  ];

  const handleSuggestionClick = (query) => {
    setSearchQuery(query);
    setIsAnimating(true);
    setTimeout(() => {
      setIsSearchActive(true);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="nav-container">
      <nav className="nav-fixed">
        <div className="nav-content">
          <div className="nav-flex">
            {/* Left section */}
            <div className="nav-left" ref={menuRef}>
              <button onClick={toggleNav} className="menu-button" aria-label="Toggle menu">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {isOpen && (
                <div className="dropdown-menu">
                  <div className="py-2">
                    <a href="#history" className="dropdown-item">
                      <History size={20} />
                      History
                    </a>
                    <a href="#offers" className="dropdown-item">
                      <Tag size={20} />
                      Offers
                    </a>
                    <a href="#inbox" className="dropdown-item">
                      <Inbox size={20} />
                      Inbox
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Center section */}
            <div className="nav-center">
              <span className="app-title">SushInnovation</span>
            </div>

            {/* Right section */}
            <div className="nav-right">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="profile-button" aria-label="Toggle dark mode">
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              <div className="relative" ref={profileRef}>
                <button onClick={toggleProfile} className="profile-button" aria-label="Profile menu">
                  <User size={24} />
                </button>

                {isProfileOpen && (
                  <div className="profile-menu">
                    <div className="py-2">
                      {isLoggedIn ? (
                        <>
                          <button className="dropdown-item w-full">
                            <Settings size={18} />
                            Settings
                          </button>
                          <button onClick={handleLogInOut} className="dropdown-item w-full">
                            <LogOut size={18} />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <button onClick={() => navigate('/signin')} className="dropdown-item w-full">
                          <LogIn size={18} />
                          Sign In
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        ref={searchContainerRef}
        className={`search-container ${isSearchActive ? 'search-active' : ''} ${isAnimating ? 'animating' : ''}`}
      >
        {!isSearchActive && (
          <div className="search-header">
            <h1 className="search-header-title">Discover Amazing Deals</h1>
          </div>
        )}

        <div className="search-form-container">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for Discounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <Search className="search-icon" />
          </form>

          {isSearchActive && (
            <div className="search-query-text">
              Showing results for: {searchQuery}
              <button onClick={resetSearch} className="new-search-button ml-4">
                New Search
              </button>
            </div>
          )}
        </div>

        {!isSearchActive && (
          <div className="suggestion-container">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id}>
                <button
                  onClick={() => handleSuggestionClick(suggestion.query)}
                  className="suggestion-button"
                >
                  {suggestion.label.split(' ')[0]}
                </button>
                <div className="suggestion-label">
                  {suggestion.label.split(' ')[1]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Results */}
      {isSearchActive && (
        <div className="mt-4">
          <SearchResults query={searchQuery} />
        </div>
      )}
    </div>
  );
};

export default Home;