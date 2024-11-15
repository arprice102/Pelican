"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { setupCurrentStepAtom } from "@/app/state/setupCurrentStepAtom";
import WelcomePage3 from "@/app/components/WelcomeWizard/WelcomePage3"
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep3Page() {
    const [setupCurrentStep, setSetupCurrentStep] = useAtom(setupCurrentStepAtom);
    const link="/setup/step2";

    useEffect(() => {  
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if(currentStep !== setupCurrentStep) {
            setSetupCurrentStep(currentStep);
        } 
    })

    return (
        <div>
            <WelcomePage3 />
        </div>
    )
}