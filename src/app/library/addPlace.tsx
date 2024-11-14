import { Place } from '../page';
import { v4 as uuidv4 } from 'uuid';

/* 
** Function which safely adds a new place to the places array stored in atom.
** Atom contents and set function passed in to help guarantee they're used inside a React hook.
**
** @place {Place} The new place object to be added
** @places {Place[]} Array of places stored in atom
** @setPlaces {value: Place[] | ((prev: Place[]) => Place[])) => void} Function to 
** update the places array in state}
*/
export default function addPlace(
    place: Place,
    places: Place[],
    setPlaces: (value: Place[] | ((prev: Place[]) => Place[])) => void
) {   
    // Clone the existing places array to avoid directly mutating it
    let newPlaces: Place[] = structuredClone(places) as Place[];

    // Assign a unique ID to the new place object
    let newPlace = place;
    const uid = uuidv4(); // Generate a unique identifier
    newPlace.id = Number(uid); // Convert the UID to a number and assign it as the place ID

    // Create a new array by adding the new place to the cloned places array
    const updatedPlaces = [
        ...newPlaces || [], // Spread the existing places array, default empty array if null
        newPlace // Add the newly created place with a unique ID
    ];

    // Update the places state with the newly updated array
    setPlaces(updatedPlaces);
}
