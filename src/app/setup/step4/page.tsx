"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { setupCurrentStepAtom } from "@/app/state/setupCurrentStepAtom";
import WelcomePage5 from "@/app/components/WelcomeWizard/WelcomePage5"
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep5Page() {
    const [setupCurrentStep, setSetupCurrentStep] = useAtom(setupCurrentStepAtom);
    const link="/setup/step4";

    useEffect(() => {  
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if(currentStep !== setupCurrentStep) {
            setSetupCurrentStep(currentStep);
        } 
    })

    return (
        <div>
            <WelcomePage5 />
        </div>
    )
}