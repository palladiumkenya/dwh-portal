import { AppFooter, AppHeader, AppBreadcrumb2 as AppBreadcrumb } from '@coreui/react';
import { Container, Row, Col } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import React, { Suspense, useCallback, useEffect, useState } from "react";
import routes from '../../routes';
import UniversalFilter from '../../views/Shared/UniversalFilter';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

const DefaultLayout = () => {

    const [globalFilters, setGlobalFilters] = useState({
        docket: '',
        htsTab: 'uptake',
        htsTabs: {
            "uptake": "HIV TESTING SERVICES UPTAKE",
            "linkage": "HIV TESTING SERVICES LINKAGE",
            "pns": "PARTNER NOTIFICATION SERVICES",
        },
        ctTab: 'txNew',
        ctTabs: {
            "txNew": "NEWLY STARTED ON ART",
            "txCurr": "CURRENT ON ART",
            "txOpt": "ART OPTIMIZATION",
            "tbHiv": "TB/HIV",
            "advEv": "ADVERSE EVENTS",
            "dsd": "DSD",
            "vl": "VL MONITORING",
            "tOut": "TREATMENT OUTCOMES"
        },
        county: [],
        subCounty: [],
        facility: [],
        partner: [],
        fromDate: '',
        toDate: '',
        year: `${new Date().getFullYear()}`,
        month: '',
        stickyFilter: false,
        countyFilterEnabled: true,
        subCountyFilterEnabled: true,
        facilityFilterEnabled: true,
        partnerFilterEnabled: true,
        fromDateFilterEnabled: true,
        toDateFilterEnabled: true,
        yearFilterEnabled: true,
        monthFilterEnabled: true,
    });

    const updateGlobalFilters = (selection) => {
        setGlobalFilters(selection);
    };

    return (

        <div className="app">
            <AppHeader fixed>
                <Suspense fallback={loading()}>
                    <DefaultHeader />
                </Suspense>
            </AppHeader>
            <Container fluid className={globalFilters && globalFilters.stickyFilter === true ? 'stickyUniversalFilter':'hiddenUniversalFilter'}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={updateGlobalFilters} />
            </Container>
            <div className="app-body">
                <main className={"main"}>
                    <AppBreadcrumb appRoutes={routes} router={router} />
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component {...props} globalFilters={globalFilters} onGlobalFiltersChange={updateGlobalFilters}/>
                                            )} />
                                    ) : (null);
                                })}
                            </Switch>
                        </Suspense>
                    </Container>
                </main>
            </div>
            <AppFooter>
                <Suspense fallback={loading()}>
                    <DefaultFooter />
                </Suspense>
            </AppFooter>
        </div>
    );
}

export default DefaultLayout;
