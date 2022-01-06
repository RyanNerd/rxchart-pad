import {BaseProvider, LightTheme} from 'baseui';
import React from 'react';
import ReactDOM from 'react-dom';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import LandingPage from 'Pages/LandingPage';

const engine = new Styletron();
const baseUrl = process.env.REACT_APP_BASEURL;

if (!baseUrl || baseUrl.length === 0) {
    throw new Error('The BASEURL environment variable is not set in the .env file or the .env file is missing');
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
    <React.StrictMode>
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <LandingPage baseUrl={baseUrl}/>
            </BaseProvider>
        </StyletronProvider>
    </React.StrictMode>
);
