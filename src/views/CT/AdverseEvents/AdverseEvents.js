import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import AdverseEventsTiles from './AdverseEventsTiles';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import AdverseEventsSeverity from './AdverseEventsSeverity';
import AdverseEventsSeverityLevels from './AdverseEventsSeverityLevels';
import AdverseEventsCausesAndActionsByDrugs from './AdverseEventsCausesAndActionsByDrugs';
// import AdverseEventsTable from './AdverseEventsTable';
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
            <AdverseEventsTiles />
            <SectionFooter overview={branding.overview}/>
            <AdverseEventsSeverity />
            <SectionFooter overview={branding.overview}/>
            <AdverseEventsSeverityLevels />
            <SectionFooter overview={branding.overview}/>
            <AdverseEventsCausesAndActionsByDrugs />
            <SectionFooter overview={branding.overview}/>
            {/* <AdverseEventsTable /> */}
        </div>
    );
};

export default AdverseEvents;
