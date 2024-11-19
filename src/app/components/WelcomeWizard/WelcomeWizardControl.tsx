import React from 'react';
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai';
import { welcomeWizardNextDisableAtom } from '@/app/state/welcomeWizardNextDisable';
import { welcomeWizardStepAtom } from '@/app/state/welcomeWizardStepAtom';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function WelcomeWizardControl({
    children,
    config,
    rootClass
}: {
    children: React.ReactNode,
    config: string[],
    rootClass: string
}) {
    const [activeStep, setActiveStep] = useAtom(welcomeWizardStepAtom);
    const [nextDisable, setNextDisable] = useAtom(welcomeWizardNextDisableAtom);
    const theme = useTheme();
    const router = useRouter();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        router.push(config[activeStep + 1]);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        router.push(config[activeStep - 1]);
    };

    // Determine if buttons should be disabled based on the current page
    let isFirstPage: boolean;
    let isLastPage: boolean;

    if (config && config.length > 0) {
        isFirstPage = activeStep === 0;
        isLastPage = activeStep === config.length - 1;
    } else {
        isFirstPage = false;
        isLastPage = false;
    }

    return (
        <>
            <main className={rootClass + "__content"}>
                {children}
            </main>
            <nav className={rootClass + "__progress-controls"}>
                <MobileStepper
                    variant="dots"
                    steps={config.length}
                    position="static"
                    activeStep={activeStep}
                    sx={{ flexGrow: 1 }}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={isLastPage || nextDisable}>
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={isFirstPage}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </nav>
        </>
    )
}