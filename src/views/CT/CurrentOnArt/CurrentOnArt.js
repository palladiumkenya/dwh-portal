import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import CurrentOnArtOverview from './CurrentOnArtOverview';
import CurrentOnArtByAgeSex from './CurrentOnArtByAgeSex';
import CurrentOnArtBySex from './CurrentOnArtBySex';
import CurrentOnArtByCounty from './CurrentOnArtByCounty';
import CurrentOnArtByPartner from './CurrentOnArtByPartner';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";

const CurrentOnART = () => {
    const branding = { title: "CURRENT ON ART", description: "OVERVIEW", overview: "Current on ART" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'txCurr') {
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
            <CurrentOnArtOverview />
            <Card>
                <CardHeader>Indicator Definition</CardHeader>
                <CardBody>
                    <ul>
                        <li>Current on ART =&gt; Number of adults and children currently receiving ART including those who have missed their appointment and 30 days have not passed since the last missed appointment.</li>
                        <em>Indicator notes:</em>
                        <li>This indicator is computed and displayed for the last completed month.</li>
                        <li>Patients who have a visit date but do not have a next appointment date have 30 days added to their visit date to impute the expected appointment date.</li>
                        <li>This indicator is influenced by reporting rate (if a facility uploaded data to the data warehouse) and if uploaded database contains <b>current</b> patient visit and appointment data.</li>
                    </ul>
                </CardBody>
            </Card>
            <Row>
                <Col>
                    <CurrentOnArtBySex />
                </Col>
                <Col>
                    <CurrentOnArtByAgeSex />
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <CurrentOnArtByCounty />
            <SectionFooter overview={branding.overview}/>
            <CurrentOnArtByPartner />
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default CurrentOnART;
