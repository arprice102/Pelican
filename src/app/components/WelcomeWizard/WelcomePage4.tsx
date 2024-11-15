"use client"

import React from 'react';

export default function WelcomePage4() {
    return (
        <div>
            <h1>Step 3 - What is the target temperature you heat your home?</h1>

            <p>Pelican needs to know the target temperature you heat your home because warmer air can carry more moisture which is important for calculating humidity.</p>

            <p>If you choose not to heat your property you will still need to input the average temperature of your home in the winter months. You can usually read the current temperature from your thermostat (non-digital display models will normally perform an audiable click if you turn the dial higher than the present temperature).</p>

            {/* TODO temparature input tool */}
        </div>
    )
}