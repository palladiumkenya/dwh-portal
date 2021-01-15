import React, { useEffect } from 'react';
import { HashRouter, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Highcharts from "highcharts";
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import './App.scss';
import AuthProvider from './utils/authProvider';
import userManager, { loadUserFromStorage } from './services/UserService';
import  { store } from './store';
import SignoutOidc from './views/Pages/Login/signout-oidc';
import SigninOidc from './views/Pages/Login/signin-oidc';
import Loading from './views/Shared/Loading';
import { loadRrSites } from './actions/Shared/rrSitesActions';
import { loadHtsSites } from './actions/Shared/htsSitesActions';
import { loadCtSites } from './actions/Shared/ctSitesActions';

const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Login = React.lazy(() => import('./views/Pages/Login'));

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    Highcharts.setOptions({ lang: { thousandsSep: ',', decimalPoint: '.', numericSymbols: null }})
}

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // fetch current user from cookies
        loadUserFromStorage(store);
        dispatch(loadRrSites());
        dispatch(loadHtsSites());
        dispatch(loadCtSites());
    }, [dispatch]);

    return (
        <AuthProvider userManager={userManager} store={store}>
            <HashRouter>
                <React.Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                        <Route path="/signout-oidc" component={SignoutOidc} />
                        <Route path="/signin-oidc" component={SigninOidc} />
                        <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
                    </Switch>
                </React.Suspense>
            </HashRouter>
        </AuthProvider>
    );
}

export default App;
