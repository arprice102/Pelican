import { atom } from 'jotai';
import { Place } from '../page.tsx';

export const fullForecastPlaceAtom = atom<undefined | Place>(undefined);