import React, { useState } from 'react';
import CurrentOnARTHeader from './CurrentOnARTHeader';
import CTFilter from '../../Shared/CTFilter';
import TrendsInTxCurr from './TrendsInTxCurr';
import CurrentOnARTFooter from './CurrentOnARTFooter';
import CurrentOnARTTxCurrByAgeSex from './CurrentOnARTTxCurrByAgeSex';
import CurrentOnARTTxCurrDistributionByCounty from './CurrentOnARTTxCurrDistributionByCounty';
import CurrentOnARTTxCurrDistributionByPartner from './CurrentOnARTTxCurrDistributionByPartner';
import CurrentOnARTTxCurrByCounty from './CurrentOnARTTxCurrByCounty';
import CurrentOnARTTxCurrByPartner from './CurrentOnARTTxCurrByPartner';

const CurrentOnART = () => {
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
            <CurrentOnARTHeader period={globalFilter?.year}>&nbsp;</CurrentOnARTHeader>
            <CTFilter onFilterChange={updateGlobalFilter} />
            <TrendsInTxCurr globalFilter={globalFilter} />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrByAgeSex globalFilter={globalFilter} />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrDistributionByCounty globalFilter={globalFilter} />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrDistributionByPartner globalFilter={globalFilter} />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrByCounty globalFilter={globalFilter} />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrByPartner globalFilter={globalFilter} />
        </div>
    );
};

export default CurrentOnART;
