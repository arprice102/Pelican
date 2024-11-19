"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardStepAtom } from "@/app/state/welcomeWizardStepAtom";
import WelcomePage6 from "@/app/components/WelcomeWizard/WelcomePage6";
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep6Page() {
    const [activeStep, setActiveStep] = useAtom(welcomeWizardStepAtom);
    const link="/setup/step5";

    useEffect(() => {  
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if(currentStep !== activeStep) {
            setActiveStep(currentStep);
        } 
    })

    return (
        <>
            <WelcomePage6 />
        </>
    )
}