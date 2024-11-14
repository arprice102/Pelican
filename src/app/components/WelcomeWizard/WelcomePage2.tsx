import React from 'react';
import SearchBox from '../SearchBox';

export default function WelcomePage2() {
    return (
        <div>
            <h1>Step 1 - Where is your home located?</h1>

            <SearchBox />

            <p>Pelican needs to know the approximate location of your home so it can look up local weather conditions essential for making humidity calculations.</p>
        </div>
    )
}