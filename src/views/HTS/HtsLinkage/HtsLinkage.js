import React, { useCallback } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import HtsLinkageHeader from './HtsLinkageHeader';
import NumberPositiveLinked from './NumberPositiveLinked';
import LinkageByAgeSex from './LinkageByAgeSex';
import LinkageByPopulationType from './LinkageByPopulationType';
import LinkageByStrategyEntryPoint from './LinkageByStrategyEntryPoint';
import LinkageByPartner from './LinkageByPartner';
import LinkageByCounty from './LinkageByCounty';
import HtsLinkageFooter from './HtsLinkageFooter';

const HtsLinkage = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.htsTab === 'linkage') {
            onGlobalFiltersChange({ ...globalFilters, stickyFilter: !isVisible});
        }
    }, [globalFilters, onGlobalFiltersChange]);
    return (
        <div className="animated fadeIn">
            <div className="strip">&nbsp;</div>
            <HtsLinkageHeader/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <NumberPositiveLinked globalFilters={globalFilters}>&nbsp;</NumberPositiveLinked>
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByAgeSex globalFilters={globalFilters} />
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByPopulationType globalFilters={globalFilters}/>
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByStrategyEntryPoint globalFilters={globalFilters}/>
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByCounty globalFilters={globalFilters}/>
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
            <LinkageByPartner globalFilters={globalFilters}/>
            <hr/><HtsLinkageFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );
};

export default HtsLinkage;
