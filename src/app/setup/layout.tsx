'use client'

import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai';
import { useTheme } from '@mui/material/styles';
import { setupCurrentStepAtom } from '../state/setupCurrentStepAtom';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import setupConfig from './config';
import './setup.css';

export default function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    const [activeStep, setActiveStep] = useAtom(setupCurrentStepAtom);
    const theme = useTheme();
    const router = useRouter();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        router.push(setupConfig[activeStep + 1]);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        router.push(setupConfig[activeStep - 1]);
    };

    // Determine if buttons should be disabled based on the current page
    let isFirstPage: boolean;
    let isLastPage: boolean;

    if (setupConfig && setupConfig.length > 0) {
        isFirstPage = activeStep === 0;
        isLastPage = activeStep === setupConfig.length - 1;
    } else {
        isFirstPage = false;
        isLastPage = false;
    }

    return (
        <section className="setup">
            <main className="setup__content">
                {children}
            </main>
            <nav className="setup__progress-controls">
                <MobileStepper
                    variant="dots"
                    steps={setupConfig.length}
                    position="static"
                    activeStep={activeStep}
                    sx={{ flexGrow: 1 }}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={isLastPage}>
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
        </section>
    )
}