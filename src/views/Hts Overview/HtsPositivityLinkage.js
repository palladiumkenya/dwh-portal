import React, { useState } from 'react';
import HtsPositivityLinkageHeader from './HtsPositivityLinkage/HtsPositivityLinkageHeader';
import HtsUptakeFilter from '../Shared/HtsUptakeFilter';
import NumberPositiveLinked from './HtsPositivityLinkage/NumberPositiveLinked';
import UptakeByAgeSex from './HtsPositivityLinkage/UptakeByAgeSex';
import LinkageByPopulationType from './HtsPositivityLinkage/LinkageByPopulationType';
import LinkageByPartner from './HtsPositivityLinkage/LinkageByPartner';
import LinkageByCounty from './HtsPositivityLinkage/LinkageByCounty';
import HtsPositivityLinkageFooter from './HtsPositivityLinkage/HtsPositivityLinkageFooter';

const HtsPositivityLinkage = () => {
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
            <HtsPositivityLinkageHeader/>
            <HtsUptakeFilter onFilterChange={updateGlobalFilter}>&nbsp;</HtsUptakeFilter>
            <NumberPositiveLinked globalFilter={globalFilter}>&nbsp;</NumberPositiveLinked>
            <hr/><HtsPositivityLinkageFooter/><hr/><div className="strip"></div><p></p>
            <UptakeByAgeSex globalFilter={globalFilter} />
            <hr/><HtsPositivityLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByPopulationType globalFilter={globalFilter}/>
            <hr/><HtsPositivityLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByCounty globalFilter={globalFilter}/>
            <hr/><HtsPositivityLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByPartner globalFilter={globalFilter}/>
            <hr/><HtsPositivityLinkageFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );
};

export default HtsPositivityLinkage;
