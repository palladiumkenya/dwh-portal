import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import "./index.css";
import App from "./App";
import Loading from "./views/Shared/Loading";
import  { store, persistor } from './store';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Loading/>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
)
