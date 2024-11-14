import React from 'react';

export default function WelcomePage5() {
    return (
        <div>
            <h1>Step 4 (optional) - How much does energy cost you?</h1>

            <p>Pelican can give you better advice about reducing dampness in your home if it can model the actual cost of running your heating and/or dehumidifying applicances.</p>

            <p>You may choose to skip this step for now and add this information later on.</p>

            <p>If you choose not to tell Pelican the cost of your energy then it will default to modelling the cost of running your appliances based on recent energy price caps (24.5p per kWh of electricity and 6.24p per kWh of gas as of June 2024)</p>

            {/* TODO energy input tool */}
        </div>
    )
}