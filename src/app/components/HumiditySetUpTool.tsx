import { useMemo } from 'react';
import MultiPageContainer from './MultiPageContainer';

export default function HumiditySetUpTool() {
    const pages = useMemo(() => [<PageOne />, <PageTwo />], []);

    return (
        <div className="humidity-set-up-tool">
            {<MultiPageContainer pages={pages} />}
        </div>
    )
}

function PageOne() {
    return (
        <div>
            <h2>Let's get started!</h2>

            <p>Pelican helps you reduce dampness in your home by tracking local humidity and advising the best times to ventilate or use a dehumidifier.</p>

            <p>To set up the tool we'll need to ask you a couple of questions about your home.</p>

            <div className="humidity-set-up__lock-tooltip"><p>The data you enter into Pelican is stored locally on your device. Pelican only uses your data to make anonymous API calls to gather local weather information and perform calculations within your device.</p></div>
        </div>
    );
}

function PageTwo() {
    return (
        <div>
            <h2>Page 2</h2>
        </div>
    );
}