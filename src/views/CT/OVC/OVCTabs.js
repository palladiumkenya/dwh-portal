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
                </TabPane>

                <TabPane tabId="managementOfOvcClients">

                </TabPane>
            </TabContent>
        </div>
    );
};

export default OVCTabs;
