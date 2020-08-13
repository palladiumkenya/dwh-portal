import React, { useState } from 'react';
import HRHFilter from '../Shared/HRHFilter';
import HRHHeader from './HRHHeader';
import CIToHTSRatio from './CIToHTSRatio';
import DistributionDensityHCW from './DistributionDensityHCW';
import DistributionDensityNCK from './DistributionDensityNCK';
import DistributionDensityMPDB from './DistributionDensityMPDB';
import DistributionDensityCOC from './DistributionDensityCOC';
import DistributionHTSCI from './DistributionHTSCI';
import DistributionHTSMap from './DistributionHTSMap';

const HRH = () => {

    const [globalFilter, setGlobalFilter] = useState({
        county: '',
        ward: '',
        constituency: '',
    });

    const updateGlobalFilter = (selection) => {
        setGlobalFilter(selection);
    };

    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <div>
                <HRHHeader></HRHHeader>
                <div className="row">
                    <div className="col-6">
                        <DistributionDensityHCW globalFilter={globalFilter}></DistributionDensityHCW>
                    </div>
                    <div className="col-6">
                        <DistributionDensityNCK globalFilter={globalFilter}></DistributionDensityNCK>
                    </div>
                    <div className="col-6">
                        <DistributionDensityMPDB globalFilter={globalFilter}></DistributionDensityMPDB>
                    </div>
                    <div className="col-6">
                        <DistributionDensityCOC globalFilter={globalFilter}></DistributionDensityCOC>
                    </div>
                    <div className="col-6">
                        <DistributionHTSCI globalFilter={globalFilter}></DistributionHTSCI>
                    </div>
                    <div className="col-6">
                        <CIToHTSRatio globalFilter={globalFilter}></CIToHTSRatio>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRH;
