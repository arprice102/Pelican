"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardNextDisableAtom } from "@/app/state/welcomeWizardNextDisable";

export default function WelcomePage7() {
    const [nextDisable, setNextDisable] = useAtom(welcomeWizardNextDisableAtom);
    
    useEffect(() => {
        // Restore disable flag to false (in case user breaks wizard sequence)
        setNextDisable(false);
    })

    return (
        <>
            <div className="setup__content-main">
                <h1>Your summary</h1>

                <p>Here is the information you've told us about your home:</p>

                {/* TODO summary tool - skip link to edit each step directly */}

                {/* TODO restart tool - ask to confirm deletion!!! */}

                {/* TODO make submit button appear, onSubmit function store data locally */}
            </div>
        </>
    )
}