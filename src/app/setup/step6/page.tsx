"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardStepAtom } from "@/app/state/welcomeWizardStepAtom";
import WelcomePage7 from "@/app/components/WelcomeWizard/WelcomePage7";
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep7Page() {
    const [activeStep, setActiveStep] = useAtom(welcomeWizardStepAtom);
    const link="/setup/step6";

    useEffect(() => {  
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if(currentStep !== activeStep) {
            setActiveStep(currentStep);
        } 
    })

    return (
        <>
            <WelcomePage7 />
        </>
    )
}