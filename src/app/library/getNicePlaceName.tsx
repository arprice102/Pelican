/*
** Combines a city, county and country/state into a single
** formatted string for display
**
** @city {string} Name of a town or city
** @county {string} Name of a county
** @state {string} Name of a country or state
*/

export default function getNicePlace(city: string, county: string, state: string) {
    let placename = city;

    if(county) {
        placename += ', ' + county;
    }

    if(state) {
        placename += ', ' + state
    }

    return placename;
}