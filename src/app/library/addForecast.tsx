import { Place, WeatherForecast } from '../page';

/* 
** Function which safely adds a new forecast to a place in places array stored in atom.
** Atom contents and set function passed in to help guarantee they're used inside a React hook.
**
** @place {Place} The place object to be modified
** @forecast {Forecast} The forecast object to be added to place
** @places {Place[]} Array of places stored in atom
** @setPlaces {value: Place[] | ((prev: Place[]) => Place[])) => void} Function to 
** update the places array in state}
*/
export default function addForecast(
    place: Place, 
    forecast: WeatherForecast, 
    places: Place[], 
    setPlaces: (value: Place[] | ((prev: Place[]) => Place[])) => void
) {    
    let newPlaces: Place[] = structuredClone(places) as Place[];

    newPlaces.forEach(p => {
        if (p.place_id === place.place_id) {
            //console.log("add forecast to ", p);
            p.forecast = forecast;
        }
    });

    setPlaces(newPlaces);
}