import React, { useCallback } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import HtsUptakeByAgeSex from './HtsUptakeByAgeSex';
import HtsUptakeByCounty from './HtsUptakeByCounty';
import HtsUptakeByPartner from './HtsUptakeByPartner';
import HtsUptakeByPopulationType from './HtsUptakeByPopulationType';
import HtsUptakeMonthsSinceLastTest from './HtsUptakeMonthsSinceLastTest';
import HtsUptakeFooter from './HtsUptakeFooter';
import HtsUptakeHeader from './HtsUptakeHeader';
import HtsUptakeTBScreeningAndTBOutcome from './HtsUptakeTBScreeningAndTBOutcome';
import HtsUptakeTestingStrategy from './HtsUptakeTestingStrategy';
import HtsUptakeTypeAndSelfTest from './HtsUptakeTypeAndSelfTest';
import NumberTestedAndPositivity from './NumberTestedPositivity';

const HtsUptake = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.htsTab === 'uptake') {
            onGlobalFiltersChange({
                ...globalFilters,
                stickyFilter: !isVisible,
                countyFilterEnabled: true,
                subCountyFilterEnabled: false,
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
            <HtsUptakeHeader period={globalFilters?.year}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <NumberTestedAndPositivity globalFilters={globalFilters}>&nbsp;</NumberTestedAndPositivity><hr />
            <HtsUptakeFooter>&nbsp;</HtsUptakeFooter><hr />
            <div className="strip">&nbsp;</div><p>&nbsp;</p>
            <HtsUptakeByAgeSex globalFilters={globalFilters} /><hr/>
            <HtsUptakeFooter/><hr/><div className="strip">&nbsp;</div><p>&nbsp;</p>
            <HtsUptakeByPopulationType globalFilters={globalFilters}/><hr/>
            <HtsUptakeFooter/><hr/>
            <div className="strip">&nbsp;</div><p>&nbsp;</p>
            <HtsUptakeTestingStrategy globalFilters={globalFilters}/><hr/>
            <HtsUptakeFooter/><hr/>
            <div className="strip">&nbsp;</div><p>&nbsp;</p>
            <HtsUptakeByCounty globalFilters={globalFilters}/><hr/>
            <HtsUptakeFooter/><hr/>
            <div className="strip">&nbsp;</div><p>&nbsp;</p>
            <HtsUptakeByPartner globalFilters={globalFilters}/><hr/>
            <HtsUptakeFooter/><hr/>
            <div className="strip">&nbsp;</div><p>&nbsp;</p>
            <HtsUptakeTypeAndSelfTest globalFilters={globalFilters}/><hr/>
            <HtsUptakeFooter/><hr/>
            <div className="strip">&nbsp;</div><p>&nbsp;</p>
            <HtsUptakeMonthsSinceLastTest globalFilters={globalFilters}/><hr/>
            <HtsUptakeFooter/><hr/>
            <div className="strip">&nbsp;</div><p>&nbsp;</p>
            <HtsUptakeTBScreeningAndTBOutcome globalFilters={globalFilters}/><hr/>
            <HtsUptakeFooter/><hr/>
            <div className="strip">&nbsp;</div><p>&nbsp;</p>
        </div>
    );
};

export default HtsUptake;
