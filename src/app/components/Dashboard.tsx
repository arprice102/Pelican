import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { pvForecastAtom } from '../state/pvForecastAtom';
import { lastPvRequestAtom } from '../state/lastPvRequestAtom';
import { lastWeatherRequestAtom } from '../state/lastWeatherRequestAtom';
import getCurrentTime from '../library/getCurrentTime';
import retrievePvJson from '../library/retrievePvJson';
import retrieveWeatherForecast from '../library/retrieveWeatherForecast';
import addForecast from '../library/addForecast';
import removePlace from '../library/removePlace';
import PlaceSummary from './PlaceSummary';
import FullForecast from "./FullForecast";
import PvForecast from "./PvForecast";
import HumidityAdvice from './HumidityAdvice';
import { Place } from './PelicanApp';

export interface WeatherForecast {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
        pod: string;
    };
    dt_txt: string;
}

export interface WeatherForecastResponse {
    forecasts: WeatherForecast[];
}

export default function Dashboard(places: any, setPlaces: any) {
    const [lastPvRequest, setLastPvRequest] = useAtom(lastPvRequestAtom);
    const [lastWeatherRequest, setLastWeatherRequest] = useAtom(lastWeatherRequestAtom);
    const [pvForecast, setPvForecast] = useAtom(pvForecastAtom);

    useEffect(() => {
        handlePvRequest();
    }, []);

    function handleFullForecast(place: Place) {
        //setFullForecastPlace(place);
    }

    /*
    ** Queues call to Solcast API. If PV JSON already exists on storageatom and doesn't match
    ** the retrieved JSON data then storageatom is updated with the new forecast.
    */
    function handlePvRequest() {
        // Only call API if last request is over 6 hours ago or there is no data stored
        if ((getCurrentTime() - lastPvRequest) >= 21600000 || pvForecast === undefined) {
            // Queue PV API call and pass in JSON result to setPvForecast
            retrievePvJson((json) => {
                // Don't update storage unless JSON isn't a match
                if (json !== pvForecast) {
                    setPvForecast(json);
                }

                // Last request only updates upon success
                setLastPvRequest(getCurrentTime());
            });
        }
    }

    // Set default body content to display no place has been added
    let placeSummary: string | JSX.Element[] = "Nowhere has been added yet!";

    // Only updates placeSummary if atom is an array and contains places
    if (Array.isArray(places) && places.length > 0) {
        placeSummary = [];

        // Loop through each place
        places.forEach((place: Place) => {
            const weatherForecast: WeatherForecastResponse = place.forecast;

            // Test if place has a weather forecast and queues an API request if not
            if (!weatherForecast) {
                // Latitude and longitude must both exist on place to make a successful API call
                if (place.lat && place.lon) {
                    /*
                    ** Async function queues call to OpenWeather API, then a callback adds the
                    ** forecast to the Place object and updates the places atom
                    */
                    retrieveWeatherForecast(
                        place.lat,
                        place.lon,
                        lastWeatherRequest,
                        setLastWeatherRequest,
                        (fc) => {
                            addForecast(place, fc, places, setPlaces);
                        });
                } else {
                    throw new Error("Can't make weather API call because co-ordinates are missing: Lat: "
                        + place.lat + " Lon: " + place.lon);
                }
            }

            if (Array.isArray(placeSummary)) {
                placeSummary.push(
                    <PlaceSummary
                        key={uuidv4()}
                        place={place}
                        onRemovePlace={() => {
                            removePlace(place);
                        }}
                        onViewForecast={() => {
                            handleFullForecast(place);
                        }}
                    />);
            }
        });
    }

    return (
        <div className="dashboard">
            <div className="placescontainer">
                {placeSummary}
            </div>

            <FullForecast />
            <HumidityAdvice />
            <PvForecast />
        </div>
    )
}