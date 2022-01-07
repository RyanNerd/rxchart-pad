import PinManager from "api/managers/PinManager";
import {BaseProvider, LightTheme} from 'baseui';
import React from 'react';
import ReactDOM from 'react-dom';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import LandingPage from 'Pages/LandingPage';

const engine = new Styletron();
const pinManager = new PinManager();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
    <React.StrictMode>
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <LandingPage PinManager={pinManager}/>
            </BaseProvider>
        </StyletronProvider>
    </React.StrictMode>
);
