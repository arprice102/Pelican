"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { setupCurrentStepAtom } from "@/app/state/setupCurrentStepAtom";
import WelcomePage2 from "@/app/components/WelcomeWizard/WelcomePage2";
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep2Page() {
    const [setupCurrentStep, setSetupCurrentStep] = useAtom(setupCurrentStepAtom);
    const link="/setup/step1";

    useEffect(() => {  
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if(currentStep !== setupCurrentStep) {
            setSetupCurrentStep(currentStep);
        } 
    })

    return (
        <div>
            <WelcomePage2 />
        </div>
    )
}