import React, { Component, useEffect } from 'react';
import './App.scss';
import store from './store';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';

import userManager, { loadUserFromStorage } from './services/UserService';
import { Provider } from 'react-redux';
import AuthProvider from './utils/authProvider';
import PrivateRoute from './utils/protectedRoute'
import SigninOidc from './views/Pages/Login/signin-oidc';
import SignoutOidc from './views/Pages/Login/signout-oidc';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login/Login'));

function App() {
    useEffect(() => {
        // fetch current user from cookies
        loadUserFromStorage(store);
    }, []);

    return (
        <Provider store={store}>
            <AuthProvider userManager={userManager} store={store}>
                <Router>
                    <React.Suspense fallback={loading()}>
                        <Switch>
                            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                            <Route path="/signout-oidc" component={SignoutOidc} />
                            <Route path="/signin-oidc" component={SigninOidc} />
                            <PrivateRoute path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
                        </Switch>
                    </React.Suspense>
                </Router>
            </AuthProvider>
        </Provider>
    )
}
/*class App extends Component{
    render() {
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
}*/

export default App;
