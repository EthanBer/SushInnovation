import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, X, User, History, Tag, Inbox, Settings, LogOut, LogIn, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../global.css'

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);
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
      setIsSearchActive(true);
    }
  };

  const resetSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };

  const handleLogInOut = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsProfileOpen(false);
  };

  return (
    <div className="nav-container">
      <nav className="nav-fixed">
        <div className="nav-content">
          <div className="nav-flex">
            {/* Left section */}
            <div className="nav-left" ref={menuRef}>
              <button
                onClick={toggleNav}
                className="menu-button"
                aria-label="Toggle menu"
              >
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
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="profile-button"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="profile-button"
                  aria-label="Profile menu"
                >
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
                          <button
                            onClick={handleLogInOut}
                            className="dropdown-item w-full"
                          >
                            <LogOut size={18} />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => navigate('/signin')}
                          className="dropdown-item w-full"
                        >
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

      {/* Main centered search */}
      <div className="main-search-container">
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
      </div>

      {/* Search results section */}
      {isSearchActive && (
        <main className="main-content">
          <div className="search-results-header">
            <h2 className="text-xl">Search Results for: {searchQuery}</h2>
            <button
              onClick={resetSearch}
              className="new-search-button"
            >
              New Search
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;