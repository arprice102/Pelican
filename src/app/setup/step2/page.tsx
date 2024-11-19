"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardStepAtom } from "@/app/state/welcomeWizardStepAtom";
import WelcomePage3 from "@/app/components/WelcomeWizard/WelcomePage3"
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep3Page() {
    const [activeStep, setActiveStep] = useAtom(welcomeWizardStepAtom);

    const link = "/setup/step2";

    useEffect(() => {
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if (currentStep !== activeStep) {
            setActiveStep(currentStep);
        }
    })

    return (
        <>
            <WelcomePage3 />
        </>
    )
}