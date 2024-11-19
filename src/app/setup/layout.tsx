'use client'

import WelcomeWizardControl from '@/app/components/WelcomeWizard/WelcomeWizardControl';
import setupConfig from '@/app/setup/config';
import '@/app/setup/setup.css';

export default function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section className="setup">
            <WelcomeWizardControl 
                children={children} 
                config={setupConfig} 
                rootClass="setup"
            />
        </section>
    )
}