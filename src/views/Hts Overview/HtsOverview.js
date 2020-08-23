import React, { useState } from 'react';
import HtsUptakeOverviewHeader from './HtsUptake/Overview/HtsUptakeOverviewHeader';
import HtsUptakeFilter from '../Shared/HtsUptakeFilter';
import NumberTestedAndPositivity from './HtsUptake/Overview/NumberTestedPositivity';
import HtsUptakeOverviewFooter from './HtsUptake/Overview/HtsUptakeOverviewFooter';
import HtsUptakeByAgeSex from './HtsUptake/Overview/HtsUptakeByAgeSex';
import HtsUptakeByPopulationType from './HtsUptake/Overview/HtsUptakeByPopulationType';
import HtsUptakeTestingStrategy from './HtsUptake/Overview/HtsUptakeTestingStrategy';
import HtsUptakeByCounty from './HtsUptake/Overview/HtsUptakeByCounty';
import HtsUptakeByPartner from './HtsUptake/Overview/HtsUptakeByPartner';
import HtsUptakeTypeAndSelfTest from './HtsUptake/Overview/HtsUptakeTypeAndSelfTest';
import HtsUptakeMonthsSinceLastTest from './HtsUptake/Overview/HtsUptakeMonthsSinceLastTest';
import HtsUptakeTBScreeningAndTBOutcome from './HtsUptake/Overview/HtsUptakeTBScreeningAndTBOutcome';

const HtsOverview = () => {
    const [globalFilter, setGlobalFilter] = useState({
            county: '',
            subCounty: '',
            facility: '',
            partner: '',
            year:`${new Date().getFullYear()}`,
            month: ''
    });

    const updateGlobalFilter = (selection) => {
        setGlobalFilter(selection);
    };

    return (
        <div className="animated fadeIn">
            <div className="strip">&nbsp;</div>

            <HtsUptakeOverviewHeader period={globalFilter?.year}/>

            <HtsUptakeFilter onFilterChange={updateGlobalFilter}>&nbsp;</HtsUptakeFilter>

            <NumberTestedAndPositivity globalFilter={globalFilter}>&nbsp;</NumberTestedAndPositivity>

            <hr />

            <HtsUptakeOverviewFooter>&nbsp;</HtsUptakeOverviewFooter>

            <hr />

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeByAgeSex globalFilter={globalFilter} />

            <hr/>

            <HtsUptakeOverviewFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeByPopulationType globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeOverviewFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeTestingStrategy globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeOverviewFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeByCounty globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeOverviewFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeByPartner globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeOverviewFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeTypeAndSelfTest globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeOverviewFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeMonthsSinceLastTest globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeOverviewFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeTBScreeningAndTBOutcome globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeOverviewFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>
        </div>
    );
};

export default HtsOverview;
