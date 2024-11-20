"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardNextDisableAtom } from "@/app/state/welcomeWizardNextDisableAtom";
import RoomDimensions from "../RoomDimensions";

export interface RoomDimensionProps {
    label: string;
    area: number;
    height: number;
}

export default function WelcomePage3() {
    const [nextDisable, setNextDisable] = useAtom(welcomeWizardNextDisableAtom);
    
    useEffect(() => {
        // Restore disable flag to false (in case user breaks wizard sequence)
        setNextDisable(false);
    })

    return (
        <>
            <div className="setup__content-main">
                <h1>Step 2 - Add the dimensions of spaces you want to ventilate</h1>

                {/* TODO - Space add tool */}
                <RoomDimensions />
            </div>

            <div className="setup__content-tooltip">
                <h3>Tooltip</h3>
                <p>Pelican needs to know the approximate size of the spaces you want to ventilate so it can model adjustments to moisture levels more accurately.</p>
            </div>
        </>
    )
}