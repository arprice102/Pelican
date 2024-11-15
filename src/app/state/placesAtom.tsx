import { atomWithStorage } from 'jotai/utils';
import { Place } from '../components/PelicanApp';

export const placesAtom = atomWithStorage<Place[]>("places", []);
