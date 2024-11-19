import { atom } from "jotai";

/*
** Temporarily stores responses to setup wizard so user can confirm
** responses before committing to long-term app memory
*/
const setupWizardMemoryAtom = atom<undefined | any>(undefined);