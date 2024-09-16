import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import Loading from './views/Shared/Loading';
import { store, persistor } from './store';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue
} from 'recoil';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
            <RecoilRoot>
                <CookiesProvider>
                    <App />
                </CookiesProvider>
            </RecoilRoot>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
