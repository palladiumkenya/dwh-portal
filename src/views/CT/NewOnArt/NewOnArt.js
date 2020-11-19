import React, { useCallback } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import NewOnArtHeader from './NewOnArtHeader';
import NewOnArtFooter from './NewOnArtFooter';
import NewOnArtTrends from './NewOnArtTrends';
import NewOnArtByAgeSex from './NewOnArtByAgeSex';
import NewOnArtBySex from './NewOnArtBySex';
import MedianTimeToArtStart from './MedianTimeToArtStart';
import MedianTimeToArtStartByCounty from './MedianTimeToArtStartByCounty';
import MedianTimeToArtStartByPartner from './MedianTimeToArtStartByPartner';
import TimeFromDiagnosisToStart from './TimeFromDiagnosisToStart';

const NewOnArt = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.ctTab === 'txNew') {
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
            <NewOnArtHeader></NewOnArtHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <p></p><NewOnArtTrends globalFilters={globalFilters}/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <NewOnArtBySex globalFilters={globalFilters}/>
                </div>
                <div className="col-6">
                    <NewOnArtByAgeSex globalFilters={globalFilters}/>
                </div>
            </div>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeToArtStart globalFilters={globalFilters}/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeToArtStartByCounty globalFilters={globalFilters}/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeToArtStartByPartner globalFilters={globalFilters}/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TimeFromDiagnosisToStart globalFilters={globalFilters}/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            {/* <p></p><FacilitiesNewOnArtList globalFilters={globalFilters}/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p> */}
        </div>
    );

};

export default NewOnArt;
