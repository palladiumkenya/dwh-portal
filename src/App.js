import React, { useEffect } from 'react';
import Highcharts from "highcharts";
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsExporting from 'highcharts/modules/exporting';
import Loadable from 'react-loadable';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { loadCtSites } from './actions/Shared/ctSitesActions';
import { loadHtsSites } from './actions/Shared/htsSitesActions';
import { loadRrSites } from './actions/Shared/rrSitesActions';
import { useCtSites } from './hooks/Shared/useCtSites'
import { store } from './store';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOADING_DELAY } from './constants';
import AuthProvider from './utils/authProvider';
import Loading from './views/Shared/Loading';
import userManager, { loadUserFromStorage } from './services/UserService';
import './App.scss';

const DefaultLayout = Loadable({ loader: () => import('./containers/DefaultLayout'), loading: Loading, delay: LOADING_DELAY });
const Login = Loadable({ loader: () => import('./views/Pages/Login'), loading: Loading, delay: LOADING_DELAY });
const SigninOidc = Loadable({ loader: () => import('./views/Pages/Login/signin-oidc'), loading: Loading, delay: LOADING_DELAY });
const SignoutOidc = Loadable({ loader: () => import('./views/Pages/Login/signout-oidc'), loading: Loading, delay: LOADING_DELAY });

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    Highcharts.setOptions({ lang: { thousandsSep: ',', decimalPoint: '.', numericSymbols: null }})
}

const App = () => {
    const ctSitesHook = useCtSites();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        ctSitesHook();
    },[])
    useEffect(() => {
        // fetch current user from cookies
        loadUserFromStorage(store);
        dispatch(loadRrSites());
        dispatch(loadHtsSites());
        dispatch(loadCtSites());
    }, [dispatch]);

    return (
        <AuthProvider userManager={userManager} store={store}>
            <HashRouter history={history}>
                <Switch>
                    <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                    <Route path="/signout-oidc" component={SignoutOidc} />
                    <Route path="/signin-oidc" component={SigninOidc} />
                    <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
                </Switch>
            </HashRouter>
        </AuthProvider>
    );
}

export default App;
