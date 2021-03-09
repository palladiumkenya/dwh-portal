import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import TreatmentOutcomesOverview from './TreatmentOutcomesOverview';
import TreatmentOutcomesOverall from './TreatmentOutcomesOverall';
import TreatmentOutcomesBySex from './TreatmentOutcomesBySex';
import TreatmentOutcomesByAge from './TreatmentOutcomesByAge';
import TreatmentOutcomesByYear from './TreatmentOutcomesByYear';
import TreatmentOutcomesByCounty from './TreatmentOutcomesByCounty';
import TreatmentOutcomesByPartner from './TreatmentOutcomesByPartner';
import ThreeMonthRetention from './ThreeMonthRetention';
import SixMonthRetention from './SixMonthRetention';
import TwelveMonthRetention from './TwelveMonthRetention';
import TwentyFourMonthRetention from './TwentyFourMonthRetention';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";

const TreatmentOutcomes = () => {
    const branding = { title: "TREATMENT OUTCOMES", description: "OVERVIEW", overview: "Treatment Outcomes" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'tOut') {
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
            <TreatmentOutcomesOverview />
            <Row>
                <Col>
                    <TreatmentOutcomesBySex />
                </Col>
                <Col>
                    <TreatmentOutcomesOverall />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <TreatmentOutcomesByAge />
            <SectionFooter overview={branding.overview}/>
            <TreatmentOutcomesByYear />
            <SectionFooter overview={branding.overview}/>
            <TreatmentOutcomesByCounty />
            <SectionFooter overview={branding.overview}/>
            <TreatmentOutcomesByPartner />
            <SectionFooter overview={branding.overview}/>
            <ThreeMonthRetention />
            <SectionFooter overview={branding.overview}/>
            <SixMonthRetention />
            <SectionFooter overview={branding.overview}/>
            <TwelveMonthRetention />
            <SectionFooter overview={branding.overview}/>
            <TwentyFourMonthRetention />
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default TreatmentOutcomes;
