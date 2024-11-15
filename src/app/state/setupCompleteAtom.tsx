import { atomWithStorage } from "jotai/utils";

export const setupCompleteAtom = atomWithStorage<boolean>('setupComplete', false);