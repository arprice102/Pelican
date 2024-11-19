"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardNextDisableAtom } from "@/app/state/welcomeWizardNextDisable";

export default function WelcomePage4() {
    const [nextDisable, setNextDisable] = useAtom(welcomeWizardNextDisableAtom);

    useEffect(() => {
        // Restore disable flag to false (in case user breaks wizard sequence)
        setNextDisable(false);
    })

    return (
        <>
            <div className="setup__content-main">
                <h1>Step 3 - What is the target temperature you heat your home?</h1>

                {/* TODO temparature input tool */}
            </div>

            <div className="setup__content-tooltip">
                <h3>Tooltip</h3>
                <p>Pelican needs to know the target temperature you heat your home because warmer air can carry more moisture which is important for calculating humidity.</p>
            </div>
        </>
    )
}