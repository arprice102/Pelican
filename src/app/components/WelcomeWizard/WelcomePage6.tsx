"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardNextDisableAtom } from "@/app/state/welcomeWizardNextDisableAtom";

export default function WelcomePage6() {
    const [nextDisable, setNextDisable] = useAtom(welcomeWizardNextDisableAtom);
    
    useEffect(() => {
        // Restore disable flag to false (in case user breaks wizard sequence)
        setNextDisable(false);
    })

    return (
        <>
            <div className="setup__content-main">
                <h1>Step 5 (optional) - Do you use dehumidifiers to manage indoor humidity?</h1>

                {/* TODO dehumidifier input tool */}
            </div>

            <div className="setup__content-tooltip">
                <h3>Tooltip</h3>
                <p>Pelican can model the cost of running your dehumidifiers and compare this to other options you have to reduce indoor humidity such as heating and ventilation.</p>
            </div>
        </>
    )
}