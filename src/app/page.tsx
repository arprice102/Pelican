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
  /*
  useEffect(() => {
    //localStorage.clear();
    const fetchedArray = fetchPlacesArrayFromLocalStorage() || [];
    console.log("fetchedarray", fetchedArray);
    
    // Retrieve forecast on inital load (will be slow because of API throttling)
    if(fetchedArray.length > 0) {
      fetchedArray.forEach((place) => {
        retrieveForecast(place, (fc) => {
          handleAddForecast(place, fc);
        });
      });
    }
  }, []);
  */

  function handleAddPlace(place) {
    dispatch({
      type: 'addPlace',
      place: place,
      id: uuidv4()
    });
  }

  function handleAddForecast(place, fc) {
    dispatch({
      type: 'addForecast',
      place: place,
      forecast: fc
    });
  }

  let summary = "Nowhere has been added yet!";

  if(places.length > 0) {
    console.log("places to print", places);
    summary = [];

    places.forEach(place => {
      console.log("print place", place, "forecast", place.forecast);
      summary.push(<PlaceSummary key={uuidv4()} place={place} forecast={place.forecast} />);
    });
  }

  return (
    <main className={styles.main}>
      <SearchBox onChange={(place) => {
        handleAddPlace(place);
        //const updatedArray = fetchUpdatedArray(places, place);
        //updatePlacesArrayInLocalStorage(updatedArray);
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
    console.log("timeout", timeout, "lastrequest", lastRequest, "apiTimeout", apiTimeout, "time", time());
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
  
function doesPlaceExistInArray(placesArray, place) {
  let placeExistsFlag = false;

  placesArray.forEach(storedPlace => {
    if(storedPlace === place) {
      placeExistsFlag = true;
    }
  });

  return placeExistsFlag;
}

function fetchUpdatedArray(placesArray, place) {
  let updatedArray = placesArray;

  if(doesPlaceExistInArray(placesArray, place) === false) {
    updatedArray = [...placesArray, place]
  }

  console.log('fetch updated array', updatedArray);

  return updatedArray
}

function fetchPlacesArrayFromLocalStorage() {
  return JSON.parse(localStorage.getItem('placesArray'));
}

function updatePlacesArrayInLocalStorage(updatedArray) {
  localStorage.setItem('placesArray', JSON.stringify(updatedArray));
}

function placesReducer(places, action) {
  switch(action.type) {
    case 'addPlace': {
      return [
        ...places,
        action.place
      ];
    }
    case 'addForecast': {
      let newPlaces = structuredClone(places);

      newPlaces.forEach(place => {
        if(place.place_id === action.place.place_id) {
          place.forecast = action.forecast;
        }
      });

      return newPlaces;
    }
  }
}