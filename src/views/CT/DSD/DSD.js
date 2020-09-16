import React, { useState } from 'react';
import CTFilter from '../../Shared/CTFilter';
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

const DSD = () => {
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
            <div className="strip"></div>
            <DSDHeader></DSDHeader>
            <CTFilter onFilterChange={updateGlobalFilter} />
            <p></p>
            <div className="row">
                <div className="col-6">
                    <DSDCascade globalFilter={globalFilter}/>
                </div>
                <div className="col-6">
                    <DistributionUnstable globalFilter={globalFilter}/>
                </div>
            </div>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <DistributionMMDStable globalFilter={globalFilter}/>
                </div>
                <div className="col-6">
                    <DistributionStableAgeSex globalFilter={globalFilter}/>
                </div>
            </div>
            <p></p><DistributionStableByCounty globalFilter={globalFilter}/>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p><DistributionStableByPartner globalFilter={globalFilter}/>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    <AppointmentDurationByStability globalFilter={globalFilter}/>
                </div>
                <div className="col-6">
                    <AppointmentDurationBySex globalFilter={globalFilter}/>
                </div>
            </div>
            <p></p><AppointmentDurationByAge globalFilter={globalFilter}/>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p><AppointmentDurationStableByCounty globalFilter={globalFilter}/>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            <p></p><AppointmentDurationStableByPartner globalFilter={globalFilter}/>
            <hr/><DSDFooter/><hr/><div className="strip"></div><p></p>
            
        </div>
    );

};

export default DSD;
