import React, { useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

const COVIDOverview = Loadable({ loader: () => import('./COVIDOverview'), loading: Loading, delay: LOADING_DELAY });
const COVIDAdultPLHIVVaccinatedByAge = Loadable({ loader: () => import('./COVIDAdultPLHIVVaccinatedByAge'), loading: Loading, delay: LOADING_DELAY });
const COVIDAdultPLHIVVaccinatedByGender = Loadable({ loader: () => import('./COVIDAdultPLHIVVaccinatedByGender'), loading: Loading, delay: LOADING_DELAY });
const COVIDCumulativeReceivedVaccination = Loadable({ loader: () => import('./COVIDCumulativeReceivedVaccination'), loading: Loading, delay: LOADING_DELAY });
const COVIDAdultPLHIVVaccinatedByCounty = Loadable({ loader: () => import('./COVIDAdultPLHIVVaccinatedByCounty'), loading: Loading, delay: LOADING_DELAY });
const COVIDAdultPLHIVVaccinatedByPartner = Loadable({ loader: () => import('./COVIDAdultPLHIVVaccinatedByPartner'), loading: Loading, delay: LOADING_DELAY });
const COVIDTrendsOfAdultPLHIVVaccinationInTheLast12Months = Loadable({ loader: () => import('./COVIDTrendsOfAdultPLHIVVaccinationInTheLast12Months'), loading: Loading, delay: LOADING_DELAY });
const InfectionsAndOutcomesOverview = Loadable({ loader: () => import('./InfectionsAndOutcomesOverview'), loading: Loading, delay: LOADING_DELAY });

const COVIDTabs = () => {
    const [activeTab, setActiveTab] = useState('vaccination');

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'vaccination' })} onClick={() => { setActiveTab('vaccination') }}>VACCINATION</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'infection&Outcomes' })} onClick={() => { setActiveTab('infection&Outcomes') }}>INFECTIONS & Management</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="vaccination">
                    <Row>
                        <Col className={"col-12"}>
                            <COVIDOverview />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-6"}>
                            <COVIDAdultPLHIVVaccinatedByGender />
                        </Col>
                        <Col className={"col-6"}>
                            <COVIDAdultPLHIVVaccinatedByAge />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"col-12"}>
                            <COVIDCumulativeReceivedVaccination />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"col-12"}>
                            <COVIDAdultPLHIVVaccinatedByCounty />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"col-12"}>
                            <COVIDAdultPLHIVVaccinatedByPartner />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"col-12"}>
                            <COVIDTrendsOfAdultPLHIVVaccinationInTheLast12Months />
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="infection&Outcomes">
                    <Row>
                        <Col className={"col-12"}>
                            <InfectionsAndOutcomesOverview />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
};

export default COVIDTabs;
