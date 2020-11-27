import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import AdverseEventsTiles from './AdverseEventsTiles';
import AdverseEventsHeader from './AdverseEventsHeader';
import AdverseEventsFooter from './AdverseEventsFooter';
import AdverseEventsSeverity from './AdverseEventsSeverity';
import AdverseEventsSeverityLevels from './AdverseEventsSeverityLevels';
import AdverseEventsCausesAndActionsByDrugs from './AdverseEventsCausesAndActionsByDrugs';
import AdverseEventsTable from './AdverseEventsTable';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/uiActions";

const AdverseEvents = () => {
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (filters.ctTab === 'advEv') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <div className="strip">&nbsp;</div>
            <AdverseEventsHeader period={filters?.year} />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <AdverseEventsTiles />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsSeverity />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsSeverityLevels />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsCausesAndActionsByDrugs />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsTable />
        </div>
    );
};

export default AdverseEvents;
