import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
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
import Retention from './Retention';
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
            <Card>
                <CardHeader>Indicator Definition</CardHeader>
                <CardBody>
                    <ul>
                        <li>Ever started on ART =&gt; Number of patients who have a documented ART start date.</li>
                        <li>Transfer out=&gt; A patient with a documented ART start date whose outcome in the review period is documented in the EMR as transferred out (moved) to a different health facility to continue receiving continuum of care and have a corresponding outcome date within the review period.</li>
                        <li>Stopped ART =&gt; A patient with a documented ART start date whose outcome in the review period is documented in the EMR as stopped ART and have a corresponding outcome date within the review period.</li>
                        <li>Lost to Follow Up =&gt; A lost to follow up (LTFU) is a patient with an ART start date who did not honor their last drug pick-up appointment and at least 30 days have elapsed since the last missed drug pick-up.</li>
                        <li>Current on ART =&gt; Number of adults and children currently receiving ART (have ART start date) including those who have missed their appointment and 30 days have not passed since the last missed appointment. Assumptions on this computation can be found under Current on ART tab)</li>
                        <li>Dead =&gt; This outcome is attributed to patients with a start ART date who are documented to have died after being started on ART, at any point when treatment outcomes were assessed.</li>
                        <em>Indicator notes:</em>
                        <li>This indicator is computed and displayed for the last completed month.</li>
                        <li>The denominator for the treatment outcomes is Ever started on ART less Stopped ART and Transfer Out.</li>
                    </ul>
                </CardBody>
            </Card>
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
            <Retention />
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default TreatmentOutcomes;
