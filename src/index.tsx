import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BaseProvider, LightTheme} from 'baseui';
// @ts-ignore
import { Provider as StyletronProvider } from "styletron-react";
// @ts-ignore
import { Client as Styletron } from "styletron-engine-atomic";

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
