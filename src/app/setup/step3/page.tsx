"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { setupCurrentStepAtom } from "@/app/state/setupCurrentStepAtom";
import WelcomePage4 from "@/app/components/WelcomeWizard/WelcomePage4"
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep4Page() {
    const [setupCurrentStep, setSetupCurrentStep] = useAtom(setupCurrentStepAtom);
    const link="/setup/step3";

    useEffect(() => {  
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if(currentStep !== setupCurrentStep) {
            setSetupCurrentStep(currentStep);
        } 
    })

    return (
        <div>
            <WelcomePage4 />
        </div>
    )
}