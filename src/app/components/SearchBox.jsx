"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { clearTimeout } from 'timers';

export default function SearchBox({ onChange }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const input = e.target.value;
        setQuery(input);
        updateModel(input, setSuggestions);
    }

    return (
        <div className="searchbox">
            <input 
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search &amp; save a new location"
            />
            {suggestions.length > 0 && (
                <ul>
                {suggestions.map((suggestion, index) => (
                    <li 
                        key={index}
                        onClick={ () => {
                            onChange(suggestion);
                        }}
                    >
                    <strong>{suggestion.display_name}</strong><br />
                    Lat: {suggestion.lat}, Lon: {suggestion.lon}
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}

/* Data model */

// API request flags
let lastRequest = new Date();
let requestRequired = null;

let latestQuery = null;
let timeoutId = null;

function updateModel(query, setSuggestions) {
    latestQuery = query;
    requestRequired = isRequestRequired(latestQuery);

    if(!requestRequired) {
        if(timeoutId) clearTimeout(timeoutId);
    } else if(!timeoutId) {
        timeoutId = setTimeout(() => {
            makeLocationApiRequest(latestQuery, setSuggestions);
            lastRequest = new Date();
            timeoutId = null;
        }, 1000);
    }
}

async function makeLocationApiRequest(query, setSuggestions) {
    try {
        const response = await axios.get('https://us1.locationiq.com/v1/autocomplete.php', {
            params: {
                key: 'pk.554aa49e75de55d41e5a48bddb1abdf7',
                q: query,
                limit: 5,
                format: 'json'
            }
        });
        
        if (response.data) {
            setSuggestions(response.data);
        } else {
            setSuggestions([]);
        }
    } catch(error) {
        console.error('Error fetching suggestions:', error);
    }
}

/* Helper functions */

function isRequestRequired(input) {
    console.log("input", input);

    if(input.length >= 3 ) {
        return true;
    } else {
        return false;
    }  
} 