"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardNextDisableAtom } from "@/app/state/welcomeWizardNextDisable";

export default function WelcomePage8() {
    const [nextDisable, setNextDisable] = useAtom(welcomeWizardNextDisableAtom);
    
    useEffect(() => {
        // Restore disable flag to false (in case user breaks wizard sequence)
        setNextDisable(false);
    })

    return (
        <>
            <div className="setup__content-main">
                <h1>What should we label this home as?</h1>

                {/* TODO label input tool - don't allow duplicates */}
            </div>

            <div className="setup__content-tooltip">
                <h3>Tooltip</h3>
                <p>Pelican can model multiple homes at a time and you can make this data easier to understand if you give each home a sensible label.</p>
            </div>
        </>
    )
}