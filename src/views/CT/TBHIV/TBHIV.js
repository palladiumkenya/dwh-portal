import React, { useCallback } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import TBHIVHeader from './TBHIVHeader';
import TBHIVFooter from './TBHIVFooter';
import TBStatTrends from './TBStatTrends';
import IPTCompletionByAge from './IPTCompletionByAge';
import IPTUptake from './IPTUptake';
import TBActiveCaseFindingAdults from './TBActiveCaseFindingAdults';
import TBActiveCaseFindingChildren from './TBActiveCaseFindingChildren';
import HIVNegativeTB from './HIVNegativeTB';
import HIVTBCoinfected from './HIVTBCoinfected';

const TBHIV = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.ctTab === 'tbHiv') {
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
            <div className="strip"></div>
            <h3 style={{color: '#ff0000', textAlign: 'center', padding: '1em'}}>Please note that the data on this page is dummy data</h3>
            <TBHIVHeader></TBHIVHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <p></p><TBStatTrends globalFilters={globalFilters}/>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <TBActiveCaseFindingAdults globalFilters={globalFilters}/>
                </div>
                <div className="col-6">
                    <TBActiveCaseFindingChildren globalFilters={globalFilters}/>
                </div>
            </div>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <HIVNegativeTB globalFilters={globalFilters}/>
                </div>
                <div className="col-6">
                    <HIVTBCoinfected globalFilters={globalFilters}/>
                </div>
            </div>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
            <div className="row">
                <div className="col-4">
                    <IPTUptake globalFilters={globalFilters}/>
                </div>
                <div className="col-8">
                    <IPTCompletionByAge globalFilters={globalFilters}/>
                </div>
            </div>
            <hr/><TBHIVFooter/><hr/><div className="strip"></div><p></p>
        </div>
    );

};

export default TBHIV;
