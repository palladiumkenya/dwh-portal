import React, { useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

const OVCOverview = Loadable({ loader: () => import('./OVCOverview'), loading: Loading, delay: LOADING_DELAY });
const OVCIndicatorDefinition = Loadable({ loader: () => import('./OVCIndicatorDefinition'), loading: Loading, delay: LOADING_DELAY });
const OVCDistributionOfCALHIVByAgeSex = Loadable({ loader: () => import('./OVCDistributionOfCALHIVByAgeSex'), loading: Loading, delay: LOADING_DELAY });
const OVCDistributionOfPatientsByAgeSex = Loadable({ loader: () => import('./OVCDistributionOfPatientsByAgeSex'), loading: Loading, delay: LOADING_DELAY });
const OVCCareGiversRelationshipToOvcClient = Loadable({ loader: () => import('./OVCCareGiversRelationshipToOvcClient'), loading: Loading, delay: LOADING_DELAY });
const OVCProportionOfOvcClientsEnrolledInCPIMSOverall = Loadable({ loader: () => import('./OVCProportionOfOvcClientsEnrolledInCPIMSOverall'), loading: Loading, delay: LOADING_DELAY });
const OVCProportionOfOvcClientsEnrolledInCPIMSMale = Loadable({ loader: () => import('./OVCProportionOfOvcClientsEnrolledInCPIMSMale'), loading: Loading, delay: LOADING_DELAY });
const OVCProportionOfOvcClientsEnrolledInCPIMSFemale = Loadable({ loader: () => import('./OVCProportionOfOvcClientsEnrolledInCPIMSFemale'), loading: Loading, delay: LOADING_DELAY });
const OVCServDistributionByCounty = Loadable({ loader: () => import('./OVCServDistributionByCounty'), loading: Loading, delay: LOADING_DELAY });
const OVCServDistributionByPartner = Loadable({ loader: () => import('./OVCServDistributionByPartner'), loading: Loading, delay: LOADING_DELAY });
const OVCDTGUptakeAmongCALHIV = Loadable({ loader: () => import('./OVCDTGUptakeAmongCALHIV'), loading: Loading, delay: LOADING_DELAY });
const OVCDTGUptakeAmongOvcPatients = Loadable({ loader: () => import('./OVCDTGUptakeAmongOvcPatients'), loading: Loading, delay: LOADING_DELAY });
const OVCMMDUptakeAmongCALHIVPatients = Loadable({ loader: () => import('./OVCMMDUptakeAmongCALHIVPatients'), loading: Loading, delay: LOADING_DELAY });
const OVCMMDUptakeAmongOvcPatients = Loadable({ loader: () => import('./OVCMMDUptakeAmongOvcPatients'), loading: Loading, delay: LOADING_DELAY });
const OVCInterruptionInTreatmentAmongCALHIV = Loadable({ loader: () => import('./OVCInterruptionInTreatmentAmongCALHIV'), loading: Loading, delay: LOADING_DELAY });
const OVCInterruptionInTreatmentAmongOVCPatients = Loadable({ loader: () => import('./OVCInterruptionInTreatmentAmongOVCPatients'), loading: Loading, delay: LOADING_DELAY });

const OVCTabs = () => {
    const [activeTab, setActiveTab] = useState('distributionOfOvcClients');

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'distributionOfOvcClients' })} onClick={() => { setActiveTab('distributionOfOvcClients') }}>DISTRIBUTION OF OVC CLIENTS</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'managementOfOvcClients' })} onClick={() => { setActiveTab('managementOfOvcClients') }}>MANAGEMENT OF OVC CLIENTS</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="distributionOfOvcClients">
                    <OVCOverview />

                    <OVCIndicatorDefinition />

                    <Row>
                        <Col className={"col-6"}>
                            <OVCDistributionOfCALHIVByAgeSex />
                        </Col>

                        <Col className={"col-6"}>
                            <OVCDistributionOfPatientsByAgeSex />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"col-12"}>
                            <OVCCareGiversRelationshipToOvcClient />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"col-4"}>
                            <OVCProportionOfOvcClientsEnrolledInCPIMSOverall />
                        </Col>

                        <Col className={"col-4"}>
                            <OVCProportionOfOvcClientsEnrolledInCPIMSMale />
                        </Col>

                        <Col className={"col-4"}>
                            <OVCProportionOfOvcClientsEnrolledInCPIMSFemale />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"col-12"}>
                            <OVCServDistributionByCounty />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"col-12"}>
                            <OVCServDistributionByPartner />
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="managementOfOvcClients">
                    <Row>
                        <Col className={"col-6"}>
                            <OVCDTGUptakeAmongCALHIV />
                        </Col>
                        <Col className={"col-6"}>
                            <OVCDTGUptakeAmongOvcPatients />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"col-6"}>
                            <OVCMMDUptakeAmongCALHIVPatients />
                        </Col>

                        <Col className={"col-6"}>
                            <OVCMMDUptakeAmongOvcPatients />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={"col-6"}>
                            <OVCInterruptionInTreatmentAmongCALHIV />
                        </Col>

                        <Col className={"col-6"}>
                            <OVCInterruptionInTreatmentAmongOVCPatients />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
};

export default OVCTabs;
