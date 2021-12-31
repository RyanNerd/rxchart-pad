import {BaseProvider, LightTheme} from 'baseui';
import authManager from "managers/authManager";
import authenticationProvider from "providers/authenticationProvider";
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

ReactDOM.render(
    <React.StrictMode>
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <LandingPage authenticationManager={authManager(authenticationProvider(baseUrl))}/>
            </BaseProvider>
        </StyletronProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
