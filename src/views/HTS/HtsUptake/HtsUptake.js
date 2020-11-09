import HtsUptakeByAgeSex from './HtsUptakeByAgeSex';
import HtsUptakeByCounty from './HtsUptakeByCounty';
import HtsUptakeByPartner from './HtsUptakeByPartner';
import HtsUptakeByPopulationType from './HtsUptakeByPopulationType';
import HtsUptakeFilter from './../../Shared/HtsUptakeFilter';
import HtsUptakeMonthsSinceLastTest from './HtsUptakeMonthsSinceLastTest';
import HtsUptakeFooter from './HtsUptakeFooter';
import HtsUptakeHeader from './HtsUptakeHeader';
import HtsUptakeTBScreeningAndTBOutcome from './HtsUptakeTBScreeningAndTBOutcome';
import HtsUptakeTestingStrategy from './HtsUptakeTestingStrategy';
import HtsUptakeTypeAndSelfTest from './HtsUptakeTypeAndSelfTest';
import NumberTestedAndPositivity from './NumberTestedPositivity';
import React, { useState } from 'react';

const HtsUptake = () => {
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

            <HtsUptakeHeader period={globalFilter?.year}/>

            <HtsUptakeFilter onFilterChange={updateGlobalFilter}>&nbsp;</HtsUptakeFilter>

            <NumberTestedAndPositivity globalFilter={globalFilter}>&nbsp;</NumberTestedAndPositivity>

            <hr />

            <HtsUptakeFooter>&nbsp;</HtsUptakeFooter>

            <hr />

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeByAgeSex globalFilter={globalFilter} />

            <hr/>

            <HtsUptakeFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeByPopulationType globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeTestingStrategy globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeByCounty globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeByPartner globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeTypeAndSelfTest globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeMonthsSinceLastTest globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>

            <HtsUptakeTBScreeningAndTBOutcome globalFilter={globalFilter}/>

            <hr/>

            <HtsUptakeFooter/>

            <hr/>

            <div className="strip">&nbsp;</div>

            <p>&nbsp;</p>
        </div>
    );
};

export default HtsUptake;
