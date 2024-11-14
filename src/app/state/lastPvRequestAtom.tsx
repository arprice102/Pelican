import { atomWithStorage } from 'jotai/utils';

export const lastPvRequestAtom = atomWithStorage<number>('lastPvRequest', 0);