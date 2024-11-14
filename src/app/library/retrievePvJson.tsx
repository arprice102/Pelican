import axios from 'axios';
import { useSetAtom } from 'jotai';
import { PvForecastResponse } from '../components/PvForecast';

/*
** Retrieves PV data from an API setup on localhost that makes regular calls to the Solcast
** PV API. A callback function (cb) is invoked when data is fetched successfully.
**
** Solcast API available through https://www.solcast.com/
**
** @cb { cb(response.data) } Callback function without a return value, API data passed in.
*/
export default async function retrievePvJson(cb: (data: PvForecastResponse) => void) {
    try {
        // Send a GET request to fetch the PV data.
        const response = await axios.get<PvForecastResponse>("https://home.richardgomer.co.uk/~alex/api/pvfetch.php");

        // Once the request is successful, invoke the callback function (cb)
        // passing in the API response data (response.data).
        const json: PvForecastResponse = response.data;

        cb(json);
    } catch (error) {
        // If an error occurs during the API request, log it to the console for debugging.
        console.error('Error fetching PV json:', error);
    }
}
