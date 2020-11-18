import React, { useCallback } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import AdverseEventsTiles from './AdverseEventsTiles';
import AdverseEventsHeader from './AdverseEventsHeader';
import AdverseEventsFooter from './AdverseEventsFooter';
import AdverseEventsSeverity from './AdverseEventsSeverity';
import AdverseEventsSeverityLevels from './AdverseEventsSeverityLevels';
import AdverseEventsCausesAndActionsByDrugs from './AdverseEventsCausesAndActionsByDrugs';
import AdverseEventsTable from './AdverseEventsTable';

const AdverseEvents = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.ctTab === 'advEv') {
            onGlobalFiltersChange({
                ...globalFilters,
                stickyFilter: !isVisible,
                countyFilterEnabled: true,
                subCountyFilterEnabled: true,
                facilityFilterEnabled: true,
                partnerFilterEnabled: true,
                agencyFilterEnabled: false,
                fromDateFilterEnabled: true,
                toDateFilterEnabled: false,
            });
        }
    }, [globalFilters, onGlobalFiltersChange]);
    return (
        <div className="animated fadeIn">
            <div className="strip">&nbsp;</div>
            <AdverseEventsHeader period={globalFilters?.year} />
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <AdverseEventsTiles globalFilters={globalFilters} />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsSeverity globalFilters={globalFilters} />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsSeverityLevels globalFilters={globalFilters} />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsCausesAndActionsByDrugs globalFilters={globalFilters} />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsTable globalFilters={globalFilters} />
        </div>
    );
};

export default AdverseEvents;
