import PinManager from 'api/managers/PinManager';
import {BaseProvider, LightTheme} from 'baseui';
import LandingPage from 'Pages/LandingPage';
import React from 'react';
import ReactDOM from 'react-dom';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';

const engine = new Styletron();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
try {
    const pinManager = new PinManager();
    root.render(
        <React.StrictMode>
            <StyletronProvider value={engine}>
                <BaseProvider theme={LightTheme}>
                    <LandingPage PinManager={pinManager} />
                </BaseProvider>
            </StyletronProvider>
        </React.StrictMode>
    );
} catch (error: unknown) {
    console.log('error details', error);
    const errorMessage = error instanceof Error ? error.message : error;
    root.render(
        <div style={{marginLeft: '15px', marginTop: '15px'}}>
            <h1>An error has occured</h1>
            <h2>Check the console log for details</h2>
            <span>{JSON.stringify(errorMessage)}</span>
        </div>
    );
}
