"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardStepAtom } from "@/app/state/welcomeWizardStepAtom";
import WelcomePage8 from "@/app/components/WelcomeWizard/WelcomePage8"
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep8Page() {
    const [activeStep, setActiveStep] = useAtom(welcomeWizardStepAtom);
    const link="/setup/step7";

    useEffect(() => {  
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if(currentStep !== activeStep) {
            setActiveStep(currentStep);
        } 
    })

    return (
        <>
            <WelcomePage8 />
        </>
    )
}