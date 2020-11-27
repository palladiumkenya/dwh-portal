import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const Login = React.lazy(() => import('./views/Pages/Login'));

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
    Highcharts.setOptions({ lang: { thousandsSep: ',', decimalPoint: '.', numericSymbols: null }})
}

const App = () => {
    return (
        <HashRouter>
            <React.Suspense fallback={loading()}>
                <Switch>
                    <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                    <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
                </Switch>
            </React.Suspense>
        </HashRouter>
    );
}

export default App;
