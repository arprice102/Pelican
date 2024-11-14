import React from 'react';

export default function WelcomePage1() {
    return (
        <div>
            <h1>Welcome to Pelican</h1>

            <p>Pelican helps you reduce dampness in your home by tracking local humidity and advising the best times to ventilate your house by opening a window, or to close the windows and use a dehumidifier instead.</p>

            <p>To set up the tool we'll need to ask you a couple of questions about your home.</p>

            <div className="humidity-set-up__lock-tooltip"><p>The data you enter into Pelican is stored locally on your device. Pelican only uses your data to make anonymous API calls to gather local weather information and performs calculations within your device.</p></div>
        </div>
    )
}