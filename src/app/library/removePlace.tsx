import { useAtom } from 'jotai';
import { placesAtom } from '../state/placesAtom.tsx';
import { Place } from '../page.tsx';

export default function removePlace(place: Place) {
    const [places, setPlaces] = useAtom(placesAtom);
    
    let newPlaces: Place[] = structuredClone(places) as Place[];
    let filteredPlaces = newPlaces.filter((p: Place) => p.id !== place.id);

    setPlaces(filteredPlaces);
}