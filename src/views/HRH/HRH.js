import React from 'react';
import SectionHeader from '../Shared/SectionHeader';
import CIToHTSRatio from './CIToHTSRatio';
import DistributionDensityHCW from './DistributionDensityHCW';
import DistributionDensityNCK from './DistributionDensityNCK';
import DistributionDensityMPDB from './DistributionDensityMPDB';
import DistributionDensityCOC from './DistributionDensityCOC';
import DistributionHTSCI from './DistributionHTSCI';

const HRH = () => {
    return (
        <div className="animated fadeIn">
            <SectionHeader title="HRH" description=""/>
            <DistributionDensityHCW/>
            <DistributionDensityNCK/>
            <DistributionHTSCI/>
            <CIToHTSRatio/>
            <DistributionDensityMPDB/>
            <DistributionDensityCOC/>
        </div>
    );
};

export default HRH;
