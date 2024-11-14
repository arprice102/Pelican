import axios from 'axios';
import getCurrentTime from './getCurrentTime';
import { WeatherForecast } from '../page';

export default async function retrieveWeatherForecast(
    latitude: string, 
    longitude: string, 
    lastWeatherRequest: number, 
    setLastWeatherRequest: (value: number | ((prev: number) => number)) => void, 
    cb: (forecast: WeatherForecast) => void
) {
    // Sets the minimum timeout required between Weather API calls (must be >= 2000ms)
    const forecastTimeout = 2000;

    const key = "81639b103a9280cd8ed12a74d3cf76cd";
    const lat = latitude;
    const lon = longitude;
    const url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${key}`;

    // Returns 0 if the most recent API request is less old than the length of forecastTimeout
    const timeout = Math.max(0, (lastWeatherRequest + forecastTimeout) - getCurrentTime());

    setLastWeatherRequest(getCurrentTime() + timeout);

    window.setTimeout(() => {
        try {
            axios.get(url)
                .then(response => {
                    // Handle the response from the API
                    cb(response.data);
                });
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error fetching weather data:', error);
        }
    }, timeout);
}