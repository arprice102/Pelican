import { atomWithStorage } from 'jotai/utils';
import { Place } from '../page';

export const placesAtom = atomWithStorage<Place[]>("places", []);
