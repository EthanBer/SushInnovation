
import React, { useEffect, useState } from 'react';
import '../global.css';

const SearchResults = ({ query }) => {
  
  const [results, setResults] = useState([]);

  useEffect(() => {
      fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query
        })
    })
    .then(response => response.json())
    .then(data => setResults(data))
    .catch(error => {
        console.error('Error:', error);
        setResults([
          {
            "id": 1,
            "title": "MacBook Pro 14' M3 Pro",
            "description": "Latest MacBook Pro with M3 Pro chip, 14-inch Liquid Retina XDR display, up to 18-hour battery life.",
            "url": "https://apple.com",
            "image": "/api/placeholder/200/200"
          }
        ])
    });
  } ,[])

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