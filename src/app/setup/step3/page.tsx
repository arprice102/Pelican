"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardStepAtom } from "@/app/state/welcomeWizardStepAtom";
import { welcomeWizardNextDisableAtom } from "@/app/state/welcomeWizardNextDisableAtom";
import WelcomePage4 from "@/app/components/WelcomeWizard/WelcomePage4"
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep4Page() {
    const [activeStep, setActiveStep] = useAtom(welcomeWizardStepAtom);
    const [nextDisable, setNextDisable] = useAtom(welcomeWizardNextDisableAtom);

    useEffect(() => {
        // Restore disable flag to false (in case user breaks wizard sequence)
        setNextDisable(false);
    })

    const link="/setup/step3";

    useEffect(() => {  
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if(currentStep !== activeStep) {
            if(setActiveStep) {
                setActiveStep(currentStep);
            }
        } 
    })

    return (
        <>
            <WelcomePage4 />
        </>
    )
}