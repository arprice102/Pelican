import axios from 'axios';
import { Place } from '../page';

/*
** Retrieves places closest matching a search string from the Locationiq API
**
** API available through https://us1.locationiq.com/
**
** @cb { cb(response.data) } Callback function without a return value, API data passed in.
*/
export default async function retrievePlaceSuggestions(searchString: string, cb: (data: Place[]) => void) {
    try {
        // Send a GET request to fetch the PV data.
        const response = await axios.get<Place[]>("https://us1.locationiq.com/v1/autocomplete.php", {
            params: {
                key: 'pk.554aa49e75de55d41e5a48bddb1abdf7',
                q: searchString,
                limit: 5,
                format: 'json'
            }
        });

        // Once the request is successful, invoke the callback function (cb)
        // passing in the API response data (response.data).
        const json: Place[] = response.data;

        cb(json);
    } catch (error) {
        // If an error occurs during the API request, log it to the console for debugging.
        console.error('Error fetching search places json:', error);
    }
}
