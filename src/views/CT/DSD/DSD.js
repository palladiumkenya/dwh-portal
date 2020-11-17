import React, { useCallback } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import DSDHeader from './DSDHeader';
import DSDFooter from './DSDFooter';
import DSDCascade from './DSDCascade';
import DistributionUnstable from './DistributionUnstable';
import DistributionMMDStable from './DistributionMMDStable';
import DistributionStableAgeSex from './DistributionStableAgeSex';
import DistributionStableByCounty from './DistributionStableByCounty';
import DistributionStableByPartner from './DistributionStableByPartner';
import AppointmentDurationByStability from './AppointmentDurationByStability';
import AppointmentDurationBySex from './AppointmentDurationBySex';
import AppointmentDurationByAge from './AppointmentDurationByAge';
import AppointmentDurationStableByCounty from './AppointmentDurationStableByCounty';
import AppointmentDurationStableByPartner from './AppointmentDurationStableByPartner';

const DSD = ({globalFilters, onGlobalFiltersChange}) => {
    const onVisibilityChange = useCallback(async (isVisible) => {
        if (globalFilters.ctTab === 'dsd') {
            onGlobalFiltersChange({ ...globalFilters, stickyFilter: !isVisible});
        }
    }, [globalFilters, onGlobalFiltersChange]);
    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <DSDHeader></DSDHeader>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
            </VisibilitySensor>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <DSDCascade globalFilters={globalFilters}/>
                </div>
                <div className="col-6">
                    <DistributionUnstable globalFilters={globalFilters}/>
                </div>
            </div>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <DistributionMMDStable globalFilters={globalFilters}/>
                </div>
                <div className="col-6">
                    <DistributionStableAgeSex globalFilters={globalFilters}/>
                </div>
            </div>
            <p></p><DistributionStableByCounty globalFilters={globalFilters}/>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p><DistributionStableByPartner globalFilters={globalFilters}/>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <AppointmentDurationByStability globalFilters={globalFilters}/>
                </div>
                <div className="col-6">
                    <AppointmentDurationBySex globalFilters={globalFilters}/>
                </div>
            </div>
            <p></p><AppointmentDurationByAge globalFilters={globalFilters}/>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p><AppointmentDurationStableByCounty globalFilters={globalFilters}/>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p><AppointmentDurationStableByPartner globalFilters={globalFilters}/>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            
        </div>
    );

};

export default DSD;
