import React, { useState } from 'react';
import CTHomeOverview from './CTHomeOverview';
import CTFilter from './../Shared/CTFilter';
import UptakeByEntryPoint from './UptakeByEntryPoint';
import CTHomeFooter from './CTHomeFooter';
import CTHomeTXNew from './CTHomeTXNew';
import CTHomeStabilityStatusAndTrendsInDSD from './CTHomeStabilityStatusAndTrendsInDsd';
import CTHomeReportingRates from './CTHomeReportingRates';

const Home = () => {
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
            <br></br>
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

export default Home;
