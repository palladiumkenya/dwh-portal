import { AppFooter, AppHeader, AppBreadcrumb2 as AppBreadcrumb } from '@coreui/react';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import React, { Component, Suspense } from "react";
import routes from '../../routes';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <Suspense fallback={this.loading()}>
                        <DefaultHeader />
                    </Suspense>
                </AppHeader>
                <div className="app-body">
                    <main className={"main"}>
                        <AppBreadcrumb appRoutes={routes} router={router} />
                        <Container fluid>
                            <Suspense fallback={this.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {
                                        return route.component ? (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={props => (
                                                    <route.component {...props} />
                                                )} />
                                        ) : (null);
                                    })}
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <DefaultFooter />
                    </Suspense>
                </AppFooter>
            </div>
        );
    }
}

export default DefaultLayout;
