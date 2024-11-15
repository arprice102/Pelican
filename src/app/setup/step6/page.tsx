"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { setupCurrentStepAtom } from "@/app/state/setupCurrentStepAtom";
import WelcomePage7 from "@/app/components/WelcomeWizard/WelcomePage7";
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep7Page() {
    const [setupCurrentStep, setSetupCurrentStep] = useAtom(setupCurrentStepAtom);
    const link="/setup/step6";

    useEffect(() => {  
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if(currentStep !== setupCurrentStep) {
            setSetupCurrentStep(currentStep);
        } 
    })

    return (
        <div>
            <WelcomePage7 />
        </div>
    )
}