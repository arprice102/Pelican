"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardNextDisableAtom } from "@/app/state/welcomeWizardNextDisableAtom";

export default function WelcomePage5() {
    const [nextDisable, setNextDisable] = useAtom(welcomeWizardNextDisableAtom);
    
    useEffect(() => {
        // Restore disable flag to false (in case user breaks wizard sequence)
        setNextDisable(false);
    })

    return (
        <>
            <div className="setup__content-main">
                <h1>Step 4 (optional) - How much does energy cost you?</h1>

                {/* TODO energy input tool */}
            </div>

            <div className="setup__content-tooltip">
                <h3>Tooltip</h3>
                <p>Pelican can give you better advice about reducing dampness in your home if it can model the actual cost of running your heating and/or dehumidifying applicances.</p>
            </div>


        </>
    )
}