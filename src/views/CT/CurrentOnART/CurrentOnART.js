import React, { useCallback } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import TrendsInTxCurr from './TrendsInTxCurr';
import CurrentOnARTHeader from './CurrentOnARTHeader';
import CurrentOnARTFooter from './CurrentOnARTFooter';
import CurrentOnARTTxCurrByAgeSex from './CurrentOnARTTxCurrByAgeSex';
import CurrentOnARTTxCurrBySex from './CurrentOnARTTxCurrBySex';
import CurrentOnARTTxCurrDistributionByCounty from './CurrentOnARTTxCurrDistributionByCounty';
import CurrentOnARTTxCurrDistributionByPartner from './CurrentOnARTTxCurrDistributionByPartner';
import CurrentOnARTTxCurrByCounty from './CurrentOnARTTxCurrByCounty';
import CurrentOnARTTxCurrByPartner from './CurrentOnARTTxCurrByPartner';

const CurrentOnART = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.ctTab === 'txCurr') {
            onGlobalFiltersChange({
                ...globalFilters,
                stickyFilter: !isVisible,
                countyFilterEnabled: true,
                subCountyFilterEnabled: true,
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
            <CurrentOnARTHeader period={globalFilters?.year}>&nbsp;</CurrentOnARTHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <TrendsInTxCurr globalFilters={globalFilters} />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <CurrentOnARTTxCurrBySex globalFilters={globalFilters}/>
                </div>
                <div className="col-6">
                    <CurrentOnARTTxCurrByAgeSex globalFilters={globalFilters}/>
                </div>
            </div>
            <p>&nbsp;</p>
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrDistributionByCounty globalFilters={globalFilters} />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrDistributionByPartner globalFilters={globalFilters} />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrByCounty globalFilters={globalFilters} />
            <hr />
            <CurrentOnARTFooter />
            <hr />
            <div className="strip">&nbsp;</div>
            <p>&nbsp;</p>
            <CurrentOnARTTxCurrByPartner globalFilters={globalFilters} />
        </div>
    );
};

export default CurrentOnART;
