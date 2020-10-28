import React, { useState } from 'react';
import AdverseEventsHeader from './AdverseEventsHeader';
import CTFilter from '../../Shared/CTFilter';
import AdverseEventsTiles from './AdverseEventsTiles';
import AdverseEventsFooter from './AdverseEventsFooter';
import AdverseEventsSeverity from './AdverseEventsSeverity';
import AdverseEventsSeverityLevels from './AdverseEventsSeverityLevels';
import AdverseEventsCausesAndActionsByDrugs from './AdverseEventsCausesAndActionsByDrugs';
import AdverseEventsTable from './AdverseEventsTable';

const AdverseEvents = () => {
    const [globalFilter, setGlobalFilter] = useState({
        county: [],
        subCounty: [],
        facility: [],
        partner: [],
        year:`${new Date().getFullYear()}`,
        month: ''
    });

    const updateGlobalFilter = (selection) => {
        setGlobalFilter(selection);
    };

    return (
        <div className="animated fadeIn">
            <div className="strip">&nbsp;</div>
            <AdverseEventsHeader period={globalFilter?.year} />
            <CTFilter onFilterChange={updateGlobalFilter} />
            <AdverseEventsTiles globalFilter={globalFilter} />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsSeverity globalFilter={globalFilter} />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsSeverityLevels globalFilter={globalFilter} />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsCausesAndActionsByDrugs globalFilter={globalFilter} />
            <hr />
            <AdverseEventsFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <AdverseEventsTable globalFilter={globalFilter} />
        </div>
    );
};

export default AdverseEvents;
