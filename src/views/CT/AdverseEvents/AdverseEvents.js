import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import AdverseEventsOverview from './AdverseEventsOverview';
import AdverseEventsClientsByAgeSexAdults from './AdverseEventsClientsByAgeSexAdults';
import AdverseEventsClientsByAgeSexChildren from './AdverseEventsClientsByAgeSexChildren';
import AdverseEventsSeverityGrading from './AdverseEventsSeverityGrading';
import AdverseEventsSeverityActions from './AdverseEventsSeverityActions';
import AdverseEventsSeverityLevels from './AdverseEventsSeverityLevels';
import AdverseEventsCauses from './AdverseEventsCauses';
import AdverseEventsActionsByDrugs from './AdverseEventsActionsByDrugs';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";

const AdverseEvents = () => {
    const branding = { title: "ADVERSE EVENTS", description: "OVERVIEW", overview: "Adverse Events" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'advEv') {
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
            <AdverseEventsOverview/>
            <Row>
                <Col><AdverseEventsClientsByAgeSexChildren/></Col>
                <Col><AdverseEventsClientsByAgeSexAdults/></Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col><AdverseEventsSeverityGrading/></Col>
                <Col><AdverseEventsSeverityActions/></Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <AdverseEventsSeverityLevels />
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col><AdverseEventsCauses/></Col>
                <Col><AdverseEventsActionsByDrugs/></Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default AdverseEvents;
