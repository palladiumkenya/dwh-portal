import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import './App.scss';
import { Provider } from 'react-redux';
import AuthProvider from './utils/authProvider';
import userManager, { loadUserFromStorage } from './services/UserService';
import store from './store';
import SignoutOidc from './views/Pages/Login/signout-oidc';
import SigninOidc from './views/Pages/Login/signin-oidc';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Login = React.lazy(() => import('./views/Pages/Login'));

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    Highcharts.setOptions({ lang: { thousandsSep: ',', decimalPoint: '.', numericSymbols: null }})
}

const App = () => {
    useEffect(() => {
        // fetch current user from cookies
        loadUserFromStorage(store)
    }, [])

    return (
        <Provider store={store}>
            <AuthProvider userManager={userManager} store={store}>
                <Router>
                    <React.Suspense fallback={loading()}>
                        <Switch>
                            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                            <Route path="/#id_token" component={SignoutOidc} />
                            <Route path="/#/signin-oidc" component={SigninOidc} />
                            <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
                        </Switch>
                    </React.Suspense>
                </Router>
            </AuthProvider>
        </Provider>
    );
}

export default App;
