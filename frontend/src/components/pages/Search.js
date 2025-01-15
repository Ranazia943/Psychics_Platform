import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const searchContrl = async (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      try {
        // Make an API call to the backend search route
        const { data } = await axios.get(`/api/psychics/data/search`, {
          params: { keyword: keyword }, // Pass the keyword as a query parameter
        });
        
        setResults(data); // Store the results to display later
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    } else {
      history.push(`/`);
    }
  };

  return (
    <div>
      <form onSubmit={searchContrl}>
        {/* <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Psychics, Category, Topic..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div> */}
      </form>

      {/* Displaying search results */}
      {results.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {results.map((profile) => (
              <li key={profile._id}>
                <strong>{profile.Psychics.username}</strong> - {profile.expertCategory} 
                <p>Topics: {profile.topics}</p>
                <p>Tools: {profile.tools}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
