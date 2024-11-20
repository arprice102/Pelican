import { atomWithStorage } from "jotai/utils";
import { Place } from "@/app/components/PelicanApp";

export interface WelcomeWizardMemory {
    label?: string | undefined,
    place: Place | undefined,
    rooms: {
        roomLabel: string | undefined,
        area: number | undefined,
        height: number | undefined,
        volume: number | undefined
    },
    targetTemp: number | undefined,
    energyCost: {
        type: "fixed" | "variable" | undefined,
        rate: number | undefined
    },
    dehumidifiers: {
        watts: number | undefined,
        btu: number | undefined
    }
}


/*
** Temporarily stores responses to setup wizard so user can confirm
** responses before committing to long-term app memory
*/
export const welcomeWizardMemoryAtom = atomWithStorage<WelcomeWizardMemory>(
    "welcomeWizardMemory",
    {
        label: undefined,
        place: undefined,
        rooms: {
            roomLabel: undefined,
            area: undefined,
            height: undefined,
            volume: undefined
        },
        targetTemp: undefined,
        energyCost: {
            type: undefined,
            rate: undefined
        },
        dehumidifiers: {
            watts: undefined,
            btu: undefined
        }
    }
);