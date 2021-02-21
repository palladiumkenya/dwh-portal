import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import ViralLoadOverview from './ViralLoadOverview';
import ViralLoadOverallUptakeAndSuppressionBySex from './ViralLoadOverallUptakeAndSuppressionBySex';
import MedianTimeTo1stVlByYear from './MedianTimeTo1stVlByYear';
import MedianTimeTo1stVlByCounty from './MedianTimeTo1stVlByCounty';
import MedianTimeTo1stVlByPartner from './MedianTimeTo1stVlByPartner';
import ViralLoadUptakeBySex from './ViralLoadUptakeBySex';
import ViralLoadUptakeByAge from './ViralLoadUptakeByAge';
import ViralLoadUptakeByCounty from './ViralLoadUptakeByCounty';
import ViralLoadUptakeByPartner from './ViralLoadUptakeByPartner';
import VLOutcomesOverall from './VLOutcomesOverall';
import VLOutcomesBySex from './VLOutcomesBySex';
import VLSuppressionByAge from './VLSuppressionByAge';
import VLSuppressionByRegimen from './VLSuppressionByRegimen';
import VLSuppressionByYear from './VLSuppressionByYear';
import ViralLoadSuppressionByCounty from './ViralLoadSuppressionByCounty';
import VLSuppressionByPartner from './VLSuppressionByPartner';
import VLSuppressionByYear6Month from './VLSuppressionByYear6Month';
import VLSuppressionByYear12Month from './VLSuppressionByYear12Month';
import VLSuppressionByYear24Month from './VLSuppressionByYear24Month';
import ViralLoadOverallUptakeAndSuppressionByFacility from './ViralLoadOverallUptakeAndSuppressionByFacility';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";

const ViralLoad = () => {
    const branding = { title: "VIRAL LOAD MONITORING", description: "OVERVIEW", overview: "Viral Load Monitoring" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'vl') {
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
            <ViralLoadOverview />
            <Row>
                <Col>
                    <ViralLoadOverallUptakeAndSuppressionBySex />
                </Col>
                <Col>
                    <MedianTimeTo1stVlByYear />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <MedianTimeTo1stVlByCounty />
            <SectionFooter overview={branding.overview}/>
            <MedianTimeTo1stVlByPartner />
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col sm={4}>
                    <ViralLoadUptakeBySex />
                </Col>
                <Col sm={8}>
                    <ViralLoadUptakeByAge />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <ViralLoadUptakeByCounty />
            <SectionFooter overview={branding.overview}/>
            <ViralLoadUptakeByPartner />
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col sm={4}>
                    <VLOutcomesOverall />
                </Col>
                <Col sm={8}>
                    <VLOutcomesBySex />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <VLSuppressionByAge />
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col sm={4}>
                    <VLSuppressionByRegimen />
                </Col>
                <Col sm={8}>
                    <VLSuppressionByYear />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <ViralLoadSuppressionByCounty />
            <SectionFooter overview={branding.overview}/>
            <VLSuppressionByPartner />
            <SectionFooter overview={branding.overview}/>
            <VLSuppressionByYear6Month />
            <SectionFooter overview={branding.overview}/>
            <VLSuppressionByYear12Month />
            <SectionFooter overview={branding.overview}/>
            <VLSuppressionByYear24Month />
            <SectionFooter overview={branding.overview}/>
            <ViralLoadOverallUptakeAndSuppressionByFacility />
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default ViralLoad;
