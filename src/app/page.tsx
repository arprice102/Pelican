"use client";

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styles from "./page.module.scss";
import { atom, useAtom } from 'jotai';
import { placesAtom } from './state/placesAtom.jsx';
import { fullForecastViewAtom } from './state/fullForecastViewAtom.jsx';
import { fullForecastPlaceAtom } from './state/fullForecastPlaceAtom.jsx';
import SearchBox from "./components/SearchBox.jsx";
import PlaceSummary from "./components/PlaceSummary.jsx";
import FullForecast from "./components/FullForecast.jsx";

export default function WeatherApp() {
  const [places, setPlaces] = useAtom(placesAtom);
  const [fullForecastView, setFullForecastView] = useAtom(fullForecastViewAtom);
  const [fullForecastPlace, setFullForecastPlace] = useAtom(fullForecastPlaceAtom);

  console.log("rerender app");

  function handleAddPlace(place) {
    let newPlaces = structuredClone(places);
    let newPlace = place;
    newPlace.id = uuidv4();

    const updatedPlaces = [
      ...newPlaces,
      newPlace
    ];

    setPlaces(updatedPlaces);
  }

  function handleRemovePlace(place) {
    let newPlaces = structuredClone(places);
    let filteredPlaces = newPlaces.filter((p) => p.id !== place.id);

    setPlaces(filteredPlaces);
  }

  function handleAddForecast(place, fc) {
    let newPlaces = structuredClone(places);
    console.log("begin add forecast to places ", places);

    newPlaces.forEach(p => {
      if (p.place_id === place.place_id) {
        console.log("add forecast to ", p);
        p.forecast = fc;
      }
    });

    setPlaces(newPlaces);
  }

  function handleFullForecast(place) {
    setFullForecastPlace(place);
    console.log("set fullforecastplace", fullForecastPlace);
  }

  let summary = "Nowhere has been added yet!";

  if (places !== undefined) {
    if (places.length > 0) {
      console.log("places to print", places);
      summary = [];

      places.forEach(place => {
        if (!place.forecast) {
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
            onRemovePlace={() => {
              handleRemovePlace(place);
            }}
            onViewForecast={() => {
              console.log("onFullForecast", place);
              handleFullForecast(place);
            }}
          />);
      });
    }
  }

  return (
    <main className={styles.main}>

      <SearchBox onChange={(place) => {
        handleAddPlace(place);
        retrieveForecast(place, (fc) => {
          handleAddForecast(place, fc);
        });
      }} />

      <h1>Weather</h1>

      <div className="placescontainer">
        {summary}
      </div>

      <FullForecast />

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