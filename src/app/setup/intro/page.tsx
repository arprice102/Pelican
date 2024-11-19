"use client"

import { useEffect } from "react";
import { useAtom } from "jotai";
import { welcomeWizardStepAtom } from "@/app/state/welcomeWizardStepAtom";
import WelcomePage1 from "@/app/components/WelcomeWizard/WelcomePage1";
import getWizardCurrentStep from "@/app/library/getWizardCurrentStep";
import setupConfig from "../config";

export default function WelcomeWizardStep1Page() {
    const [activeStep, setActiveStep] = useAtom(welcomeWizardStepAtom);

    const link = "/setup/intro";

    useEffect(() => {
        const currentStep = getWizardCurrentStep(link, setupConfig);

        if (currentStep !== activeStep) {
            setActiveStep(currentStep);
        }
    })

    return (
        <>
            <WelcomePage1 />
        </>
    )
}