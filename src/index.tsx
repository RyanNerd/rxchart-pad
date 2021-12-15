import {BaseProvider, LightTheme} from 'baseui';
import React from 'react';
import ReactDOM from 'react-dom';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import App from './App';

const engine = new Styletron();

ReactDOM.render(
    <React.StrictMode>
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <App />
            </BaseProvider>
        </StyletronProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
