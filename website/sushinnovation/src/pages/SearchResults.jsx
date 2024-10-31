import React from 'react';
import '../global.css';

const SearchResults = ({ query }) => {
  // Mock data - replace with actual API call
  const results = [
    {
      id: 1,
      title: "MacBook Pro 14' M3 Pro",
      description: "Latest MacBook Pro with M3 Pro chip, 14-inch Liquid Retina XDR display, up to 18-hour battery life.",
      url: "https://apple.com",
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      title: "MacBook Air 13' M2",
      description: "Incredibly thin and light, featuring the M2 chip and up to 18 hours of battery life.",
      url: "#",
      image: "/api/placeholder/200/200"
    },
    {
      id: 3,
      title: "iPad Pro 12.9' M2",
      description: "Most advanced iPad ever with M2 chip, Liquid Retina XDR display, and Apple Pencil hover.",
      url: "#",
      image: "/api/placeholder/200/200"
    },
    {
      id: 4,
      title: "iPhone 15 Pro Max",
      description: "Pro camera system, A17 Pro chip, titanium design, and Action button.",
      url: "#",
      image: "/api/placeholder/200/200"
    }
  ];

  return (
    <div className="search-results-wrapper">
      <div className="search-results-grid">
        {results.map((item) => (
          <a href={item.url} key={item.id} className="result-card">
            <div className="result-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="result-content">
              <h3 className="result-title">{item.title}</h3>
              <p className="result-description">{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;