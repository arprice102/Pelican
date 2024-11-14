import { atomWithStorage } from 'jotai/utils';
import { PvForecastResponse } from '../components/PvForecast';

export const pvForecastAtom = atomWithStorage<undefined | PvForecastResponse>('pvForecast', undefined);