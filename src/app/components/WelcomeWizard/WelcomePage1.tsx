import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardNextDisableAtom } from "@/app/state/welcomeWizardNextDisable";

export default function WelcomePage1() {
    const [nextDisable, setNextDisable] = useAtom(welcomeWizardNextDisableAtom);
    
    useEffect(() => {
        // Restore disable flag to false (in case user breaks wizard sequence)
        setNextDisable(false);
    })

    return (
        <>
            <div className="setup__content-main">
                <h1>Welcome to Pelican</h1>

                <p>Pelican is an app which helps you reduce dampness in your home by keeping track of local weather conditions to advise on optimal methods to ventilate your home.</p>

                <p>To set up Pelican you'll need to answer some questions about where you live.</p>

                <p>This wizard should take around <b>5 minutes</b> to complete.</p>
            </div>

            <div className="setup__content-tooltip setup__content-tooltip--lock ">
                <h3>Tooltip</h3>
                <p>The data you enter into Pelican is stored locally on your device. Pelican only uses your data to make anonymous API calls to gather local weather information and performs calculations within your device.</p>
            </div>
        </>
    )
}