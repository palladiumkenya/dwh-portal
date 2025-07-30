import React, { useEffect } from 'react';
import Highcharts from "highcharts";
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsExporting from 'highcharts/modules/exporting';
import Loadable from 'react-loadable';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { loadCtSites } from './actions/Shared/ctSitesActions';
import { loadHtsSites } from './actions/Shared/htsSitesActions';
import { loadRrSites } from './actions/Shared/rrSitesActions';
import { loadDWHSummary } from './actions/Shared/dwhSummaryActions';
import { store } from './store';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOADING_DELAY } from './constants';
import AuthProvider from './utils/authProvider';
import Loading from './views/Shared/Loading';
import userManager, { loadUserFromStorage } from './services/UserService';
import './App.scss';

// External CSS libraries (imported via JS, not SCSS)
import '@coreui/icons/css/all.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'semantic-ui-css/semantic.min.css';

const DefaultLayout = Loadable({ loader: () => import('./containers/DefaultLayout'), loading: Loading, delay: LOADING_DELAY });
const Login = Loadable({ loader: () => import('./views/Pages/Login'), loading: Loading, delay: LOADING_DELAY });
const SigninOidc = Loadable({ loader: () => import('./views/Pages/Login/signin-oidc'), loading: Loading, delay: LOADING_DELAY });
const SignoutOidc = Loadable({ loader: () => import('./views/Pages/Login/signout-oidc'), loading: Loading, delay: LOADING_DELAY });
const Resources = Loadable({
    loader: () => import('./views/Pages/Resources/Resources'),
    loading: Loading,
    delay: LOADING_DELAY,
});

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    Highcharts.setOptions({ lang: { thousandsSep: ',', decimalPoint: '.', numericSymbols: null }})
}

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const period = `${year},${month}`;

    useEffect(() => {
        // fetch current user from cookies
        loadUserFromStorage(store);
        dispatch(loadRrSites());
        dispatch(loadHtsSites());
        dispatch(loadCtSites());
        dispatch(loadDWHSummary("CT", period));
    }, [dispatch, period]);

    return (
        <AuthProvider userManager={userManager} store={store}>
            <HashRouter history={history}>
                <Switch>
                    <Route
                        exact
                        path="/login"
                        name="Login Page"
                        render={(props) => <Login {...props} />}
                    />
                    <Route path="/signout-oidc" component={SignoutOidc} />
                    <Route path="/signin-oidc" component={SigninOidc} />
                    <Route path="/resources" component={Resources} />
                    <Route
                        path="/"
                        name="Home"
                        render={(props) => <DefaultLayout {...props} />}
                    />
                </Switch>
            </HashRouter>
        </AuthProvider>
    );
}

export default App;
