import React, { useState } from 'react';
import CTHomeOverview from './Home/CTHomeOverview';
import CTFilter from '../Shared/CTFilter';
import UptakeByEntryPoint from './Home/UptakeByEntryPoint';
import CTHomeFooter from './Home/CTHomeFooter';
import CTHomeTXNew from './Home/CTHomeTXNew';
import CTHomeStabilityStatusAndTrendsInDSD from './Home/CTHomeStabilityStatusAndTrendsInDsd';
import CTHomeReportingRates from './Home/CTHomeReportingRates';

const CareTreatment = () => {
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

            <CTHomeOverview period={globalFilter?.year} />

            <CTFilter onFilterChange={updateGlobalFilter} />

            <p>
                <strong>1223</strong> Health Facilities in 44 Countries in Kenya,
                supported by 44 SDPs have ever uploaded care & treatment data to the warehouse since it’s inception.
                As at July 2020,<strong>1035</strong> facilities had reported patients current on ART.
            </p>

            <UptakeByEntryPoint globalFilter={globalFilter} />

            <hr />

            <CTHomeFooter />

            <hr />

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <CTHomeTXNew globalFilter={globalFilter} />

            <hr />

            <CTHomeFooter />

            <hr />

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <CTHomeStabilityStatusAndTrendsInDSD globalFilter={globalFilter} />

            <hr />

            <CTHomeFooter />

            <hr />

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <CTHomeReportingRates globalFilter={globalFilter} />

        </div>
    );
};

export default CareTreatment;
