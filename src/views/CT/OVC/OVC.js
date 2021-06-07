import SectionHeader from '../../Shared/SectionHeader';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
import { Col, Row } from 'reactstrap';
const OVCOverview = Loadable({ loader: () => import('./OVCOverview'), loading: Loading, delay: LOADING_DELAY });
const OVCIndicatorDefinition = Loadable({ loader: () => import('./OVCIndicatorDefinition'), loading: Loading, delay: LOADING_DELAY });
// const OvcDistributionOfOvcClients = Loadable({ loader: () => import('./OvcDistributionOfOvcClients'), loading: Loading, delay: LOADING_DELAY });
const OVCCareGiversRelationshipToOvcClient = Loadable({ loader: () => import('./OVCCareGiversRelationshipToOvcClient'), loading: Loading, delay: LOADING_DELAY });
const OVCProportionOfOvcClientsEnrolledInCPIMSOverall = Loadable({ loader: () => import('./OVCProportionOfOvcClientsEnrolledInCPIMSOverall'), loading: Loading, delay: LOADING_DELAY });
const OVCProportionOfOvcClientsEnrolledInCPIMSFemale = Loadable({ loader: () => import('./OVCProportionOfOvcClientsEnrolledInCPIMSFemale'), loading: Loading, delay: LOADING_DELAY });
const OVCProportionOfOvcClientsEnrolledInCPIMSMale = Loadable({ loader: () => import('./OVCProportionOfOvcClientsEnrolledInCPIMSMale'), loading: Loading, delay: LOADING_DELAY });
const OVCServDistributionByCounty = Loadable({ loader: () => import('./OVCServDistributionByCounty'), loading: Loading, delay: LOADING_DELAY });
const OVCServDistributionByPartner = Loadable({ loader: () => import('./OVCServDistributionByPartner'), loading: Loading, delay: LOADING_DELAY });
const OVCClientExitReasons = Loadable({ loader: () => import('./OVCClientExitReasons'), loading: Loading, delay: LOADING_DELAY });
const OVCViralSuppressionAmongOvcPatientsOverall = Loadable({ loader: () => import('./OVCViralSuppressionAmongOvcPatientsOverall'), loading: Loading, delay: LOADING_DELAY });
const OVCViralSuppressionAmongOvcPatientsMale = Loadable({ loader: () => import('./OVCViralSuppressionAmongOvcPatientsMale'), loading: Loading, delay: LOADING_DELAY });
const OVCViralSuppressionAmongOvcPatientsFemale = Loadable({ loader: () => import('./OVCViralSuppressionAmongOvcPatientsFemale'), loading: Loading, delay: LOADING_DELAY });

const OVC = () => {
    const branding = { title: "OVC", description: "OVERVIEW", overview: "OVC" };
    const [activeTab, setActiveTab] = useState('ovc');
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'ovc') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <OVCOverview />
            <OVCIndicatorDefinition />
            <Row>
                {/*<Col className={"col-6"}>
                    <OvcDistributionOfOvcClients />
                </Col>*/}

                <Col className={"col-6"}>
                    <OVCCareGiversRelationshipToOvcClient />
                </Col>
            </Row>
            <Row>
                <Col className={"col-4"}>
                    <OVCProportionOfOvcClientsEnrolledInCPIMSOverall />
                </Col>

                <Col className={"col-4"}>
                    <OVCProportionOfOvcClientsEnrolledInCPIMSFemale />
                </Col>
                <Col className={"col-4"}>
                    <OVCProportionOfOvcClientsEnrolledInCPIMSMale />
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
            <Row>
                <Col className={"col-12"}>
                    <OVCClientExitReasons />
                </Col>
            </Row>
            <Row>
                <Col className={"col-4"}>
                    <OVCViralSuppressionAmongOvcPatientsOverall />
                </Col>
                <Col className={"col-4"}>
                    <OVCViralSuppressionAmongOvcPatientsFemale />
                </Col>
                <Col className={"col-4"}>
                    <OVCViralSuppressionAmongOvcPatientsMale />
                </Col>
            </Row>
        </div>
    );
};

export default OVC;
