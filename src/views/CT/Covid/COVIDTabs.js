import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
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
const COVIDSeverityOfInfectionByGender = Loadable({ loader: () => import('./COVIDSeverityOfInfectionByGender'), loading: Loading, delay: LOADING_DELAY });
const COVIDTrendsOfSeverity = Loadable({ loader: () => import('./COVIDTrendsOfSeverity'), loading: Loading, delay: LOADING_DELAY });
const COVIDAdmissionOfCovidSymptomatic = Loadable({ loader: () => import('./COVIDAdmissionOfCovid-19Symptomatic'), loading: Loading, delay: LOADING_DELAY });
const COVIDAdmissionByAge = Loadable({ loader: () => import('./COVIDAdmissionByAge'), loading: Loading, delay: LOADING_DELAY });
const COVIDManagementInHospital = Loadable({ loader: () => import('./COVIDManagementInHospital'), loading: Loading, delay: LOADING_DELAY });
const COVIDPercentageWhoMissedAppointment = Loadable({ loader: () => import('./COVIDPercentageWhoMissedAppointment'), loading: Loading, delay: LOADING_DELAY });
const COVIDPercentageWhoMissedAppointmentByAge = Loadable({ loader: () => import('./COVIDPercentageWhoMissedAppointmentByAge'), loading: Loading, delay: LOADING_DELAY });
const COVIDPercentageWhoMissedAppointmentByCounty = Loadable( { loader: () => import('./COVIDPercentageWhoMissedAppointmentByCounty'), loading: Loading, delay: LOADING_DELAY });
const COVIDPercentageWhoMissedAppointmentByPartner = Loadable( { loader: () => import('./COVIDPercentageWhoMissedAppointmentByPartner'), loading: Loading, delay: LOADING_DELAY });
const COVIDCumulativeNumberAdultPLHIVWithMissingDateGivenFirstDose = Loadable({loader: () => import('./CovidCumulativeNumberAdultPlhivWithMissingDateGivenFirstDose'), loading: Loading, delay: LOADING_DELAY })

const COVIDTabs = () => {
    const [activeTab, setActiveTab] = useState('vaccination');

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'vaccination' })} onClick={() => { setActiveTab('vaccination') }}>VACCINATION</NavLink>
                </NavItem>

                {/*<NavItem>*/}
                {/*    <NavLink className={classnames({ active: activeTab === 'infection&Outcomes' })} onClick={() => { setActiveTab('infection&Outcomes') }}>INFECTIONS & OUTCOMES</NavLink>*/}
                {/*</NavItem>*/}
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="vaccination">
                    <Row>
                        <Col className={"col-12 pt-5 pb-5"}>
                            <COVIDOverview />
                        </Col>
                    </Row>
                    <Card>
                        <CardHeader>Indicator Definition</CardHeader>
                        <CardBody>
                            <ul>
                                <li>Screened for Vaccination => PLHIV Aged 15+Years who are current on ART and have been assessed for COVID 19 vaccination.</li>
                                <li>Partially Vaccinated PLHIV => PLHIV Aged 15+Years who are current on ART and have received at least one dose.</li>
                                <li>Fully Vaccinated PLHIV=> PLHIV Aged 15+Years who are current on ART and have received full vaccination doses according to MoH guidelines.</li>
                            </ul>
                        </CardBody>
                    </Card>
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
                            <COVIDCumulativeNumberAdultPLHIVWithMissingDateGivenFirstDose />
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

                    {/*<Row>*/}
                    {/*    <Col className={"col-12"}>*/}
                    {/*        <COVIDTrendsOfAdultPLHIVVaccinationInTheLast12Months />*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </TabPane>

                <TabPane tabId="infection&Outcomes">
                    <Row className={'pt-5 mb-5'}>
                        <Col className={"col-1"} />
                        <Col className={"col-10"}>
                            <InfectionsAndOutcomesOverview />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-6"}>
                            <COVIDSeverityOfInfectionByGender />
                        </Col>
                        <Col className={"col-6"}>
                            <COVIDTrendsOfSeverity />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <COVIDAdmissionOfCovidSymptomatic />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <COVIDAdmissionByAge />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <COVIDPercentageWhoMissedAppointment />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <COVIDPercentageWhoMissedAppointmentByAge />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <COVIDPercentageWhoMissedAppointmentByCounty />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-12"}>
                            <COVIDPercentageWhoMissedAppointmentByPartner />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
};

export default COVIDTabs;
