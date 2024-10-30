import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, X, User, History, Tag, Inbox, Settings, LogOut, LogIn } from 'lucide-react';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const menuRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // Close menus when clicking outside
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
    <div className="min-h-screen bg-gray-900">
      {/* Fixed Navigation */}
      <nav className="bg-gray-800 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between relative">
            {/* Left side - Menu and App Name */}
            <div className="flex items-center" ref={menuRef}>
              <button
                onClick={toggleNav}
                className="text-gray-200 hover:text-white focus:outline-none p-2 hover:bg-gray-700 rounded-lg"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="text-white text-xl ml-4 font-semibold">SushInnovation</span>
              
              {/* Hamburger Menu Dropdown */}
              {isOpen && (
                <div className="absolute top-full left-0 w-56 mt-2 bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="py-2">
                    <a href="#history" className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-600">
                      <History size={20} className="mr-3" />
                      History
                    </a>
                    <a href="#offers" className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-600">
                      <Tag size={20} className="mr-3" />
                      Offers
                    </a>
                    <a href="#inbox" className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-600">
                      <Inbox size={20} className="mr-3" />
                      Inbox
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Center - Search Bar */}
            <div className={`flex-1 max-w-xl mx-4 transition-all duration-300 ${isSearchActive ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search for Discounts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </form>
              </div>
            </div>

            {/* Right side - Profile */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={toggleProfile}
                className="text-gray-200 hover:text-white p-2 rounded-lg hover:bg-gray-700"
                aria-label="Profile menu"
              >
                <User size={24} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg bg-gray-700 overflow-hidden">
                  <div className="py-2">
                    {isLoggedIn ? (
                      <>
                        <button
                          onClick={() => {/* Handle settings */}}
                          className="flex items-center w-full px-4 py-3 text-gray-200 hover:bg-gray-600"
                        >
                          <Settings size={18} className="mr-3" />
                          Settings
                        </button>
                        <button
                          onClick={handleLogInOut}
                          className="flex items-center w-full px-4 py-3 text-gray-200 hover:bg-gray-600"
                        >
                          <LogOut size={18} className="mr-3" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleLogInOut}
                        className="flex items-center w-full px-4 py-3 text-gray-200 hover:bg-gray-600"
                      >
                        <LogIn size={18} className="mr-3" />
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Centered Search */}
      <div className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${isSearchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="w-full max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for Discounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
            />
            <Search className="absolute left-4 top-4 text-gray-400" size={24} />
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      <main className={`max-w-6xl mx-auto p-4 mt-20 transition-opacity duration-300 ${isSearchActive ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-white">
          {isSearchActive && (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Search Results for: {searchQuery}</h2>
              <button 
                onClick={resetSearch}
                className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
              >
                New Search
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NavigationBar;
