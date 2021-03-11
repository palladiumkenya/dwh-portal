import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import DSDOverview from './DSDOverview';
import DSDCascade from './DSDCascade';
import DistributionUnstable from './DistributionUnstable';
import DistributionMMDStable from './DistributionMMDStable';
import DistributionStableAgeSex from './DistributionStableAgeSex';
import DistributionStableByCounty from './DistributionStableByCounty';
import DistributionStableByPartner from './DistributionStableByPartner';
import AppointmentDurationByStability from './AppointmentDurationByStability';
import AppointmentDurationBySex from './AppointmentDurationBySex';
import AppointmentDurationByAge from './AppointmentDurationByAge';
import AppointmentDurationStableByCounty from './AppointmentDurationStableByCounty';
import AppointmentDurationStableByPartner from './AppointmentDurationStableByPartner';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import DSDIndicatorDefinition from './DSDIndicatorDefinition';

const DSD = () => {
    const branding = { title: "DIFFERENTIATED SERVICE DELIVERY", description: "OVERVIEW", overview: "Differenciated Service Delivery" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'dsd') {
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
            <DSDOverview />
            <DSDIndicatorDefinition />
            <SectionFooter overview={branding.overview}/>
            <Row className={"col-12"}>
                <Col className={"col-6"}>
                    <DSDCascade />
                </Col>
                <Col className={"col-6"}>
                    <DistributionMMDStable />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <Row className={"col-12"}>
                <Col className={"col-6"}>
                    <AppointmentDurationByStability />
                </Col>
                <Col className={"col-6"}>
                    <AppointmentDurationBySex />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <AppointmentDurationStableByCounty />
            <SectionFooter overview={branding.overview}/>
            <AppointmentDurationStableByPartner />
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col>
                    <DistributionStableAgeSex />
                </Col>
                <Col>
                    <DistributionUnstable />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <AppointmentDurationByAge />
            <SectionFooter overview={branding.overview}/>
            <DistributionStableByCounty />
            <SectionFooter overview={branding.overview}/>
            <DistributionStableByPartner />
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default DSD;
