"use client";

import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from "./page.module.scss";
import SearchBox from "./components/SearchBox.jsx";
import PlaceSummary from "./components/PlaceSummary.jsx";

export default function WeatherApp() {
  const [places, dispatch] = useReducer(placesReducer, []);

  console.log("rerender app");

  // Ensures we only interact with localstorage client-side 
  useEffect(() => {
    //localStorage.clear();
    handleFetchLocalStorage();
  }, []);
  
  function handleAddPlace(place) {
    dispatch({
      type: 'addPlace',
      place: place,
      id: uuidv4()
    });
  }

  function handleRemovePlace(place) {
    dispatch({
      type: 'removePlace',
      place: place
    });
  }

  function handleAddForecast(place, fc) {
    dispatch({
      type: 'addForecast',
      place: place,
      forecast: fc
    });
  }

  function handleFetchLocalStorage() {
    dispatch({
      type: 'fetchLocalStorage'
    });
  }

  let summary = "Nowhere has been added yet!";

  if(places.length > 0) {
    console.log("places to print", places);
    summary = [];

    places.forEach(place => {
      if(!place.forecast) {
        retrieveForecast(place, (fc) => {
          handleAddForecast(place, fc);
        });
      }

      console.log("print place", place, "forecast", place.forecast);
      summary.push(
        <PlaceSummary 
          key={uuidv4()} 
          place={place} 
          forecast={place.forecast} 
          onClick={() => {
            handleRemovePlace(place);
          }} 
        />);
    });
  }

  return (
    <main className={styles.main}>
      <SearchBox onChange={(place) => {
        handleAddPlace(place);
        retrieveForecast(place, (fc) => {
          handleAddForecast(place, fc);
        });
      }} />

      {/*<FrequencyToggleButton*/}

      <h1>Weather</h1>

      <div className="placescontainer">
        {summary}
      </div>
    </main>
  );
}

/* Data model */

let lastRequest = 0; // Tracks the last API request to allow throttling
let apiTimeout = 2000; // Adjusts the frequency of API requests must be no lower than 1 second

function time() {
  return Date.now();
}

async function retrieveForecast(place, cb) {
  console.log("retrieving forecast from place", place);

  const key = "81639b103a9280cd8ed12a74d3cf76cd";
  const lat = place.lat;
  const lon = place.lon;
  const url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${key}`;

  // Returns 0 if the most recent API request is less old than the length of ApiTimeout
  const timeout = Math.max(0, (lastRequest + apiTimeout) - time());
    //console.log("timeout", timeout, "lastrequest", lastRequest, "apiTimeout", apiTimeout, "time", time());
    lastRequest = time() + timeout;

  window.setTimeout(() => {
    try {
      axios.get(url)
        .then(response => {
          console.log("Data retrieved from ", place.address.name, response.data);
          // Handle the response from the API
          cb(response.data);
        });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error fetching the weather data:', error);
    }
  }, timeout);
}

function fetchPlacesInLocalStorage() {
  return JSON.parse(localStorage.getItem('places'));
}

function updatePlacesInLocalStorage(updatedPlaces) {
  localStorage.setItem('places', JSON.stringify(updatedPlaces));
  console.log("updated local storage", fetchPlacesInLocalStorage());
}

function placesReducer(places, action) {
  switch(action.type) {
    case 'addPlace': {
      let newPlace = action.place;
      newPlace.id = action.id;

      const updatedPlaces = [
        ...places,
        newPlace
      ];

      updatePlacesInLocalStorage(updatedPlaces);
      return updatedPlaces;
    }
    case 'removePlace': {
      let newPlaces = structuredClone(places);
      let filteredPlaces = newPlaces.filter((place) => place.id !== action.place.id);

      updatePlacesInLocalStorage(filteredPlaces);
      return filteredPlaces;
    }
    case 'addForecast': {
      let newPlaces = structuredClone(places);
      console.log("begin add forecast to places ", places);

      newPlaces.forEach(place => {
        if(place.place_id === action.place.place_id) {
          console.log("add forecast to ", place);
          place.forecast = action.forecast;
        }
      });

      return newPlaces;
    }
    case 'fetchLocalStorage': {
      return fetchPlacesInLocalStorage() || [];
    }
  }
}