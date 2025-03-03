import React from 'react'

export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <div className="relative">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="search-icon" />
      </div>
    </div>
  );
}
