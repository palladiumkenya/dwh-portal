import React, { useState } from 'react';
import HtsLinkageHeader from './HtsLinkageHeader';
import HtsUptakeFilter from '../../Shared/HtsUptakeFilter';
import NumberPositiveLinked from './NumberPositiveLinked';
import LinkageByAgeSex from './LinkageByAgeSex';
import LinkageByPopulationType from './LinkageByPopulationType';
import LinkageByStrategyEntryPoint from './LinkageByStrategyEntryPoint';
import LinkageByPartner from './LinkageByPartner';
import LinkageByCounty from './LinkageByCounty';
import HtsLinkageFooter from './HtsLinkageFooter';

const HtsLinkage = () => {
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
            <HtsLinkageHeader/>
            <HtsUptakeFilter onFilterChange={updateGlobalFilter}>&nbsp;</HtsUptakeFilter>
            <NumberPositiveLinked globalFilter={globalFilter}>&nbsp;</NumberPositiveLinked>
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByAgeSex globalFilter={globalFilter} />
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByPopulationType globalFilter={globalFilter}/>
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByStrategyEntryPoint globalFilter={globalFilter}/>
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByCounty globalFilter={globalFilter}/>
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByPartner globalFilter={globalFilter}/>
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );
};

export default HtsLinkage;
