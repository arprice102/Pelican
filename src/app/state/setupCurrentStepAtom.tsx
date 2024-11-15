import { atomWithStorage } from "jotai/utils";

// Tracks current progress in app setup wizard as a number to pass into an array of links
export const setupCurrentStepAtom = atomWithStorage<number>("setupCurrentStep", 0);