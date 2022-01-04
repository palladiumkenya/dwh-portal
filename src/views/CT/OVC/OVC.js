import SectionHeader from '../../Shared/SectionHeader';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableStickyFilter, enableStickyFilter } from '../../../actions/Shared/uiActions';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';
const OVCTabs = Loadable({ loader: () => import('./OVCTabs'), loading: Loading, delay: LOADING_DELAY });

const OVC = () => {
    const branding = { title: "OVC", description: "OVERVIEW", overview: "OVC" };
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

            <OVCTabs />

            {/*<OVCOverview />
            <OVCIndicatorDefinition />
            <Row>
                <Col className={"col-6"}>
                    <OvcDistributionOfOvcClients />
                </Col>

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
            </Row>*/}
        </div>
    );
};

export default OVC;
