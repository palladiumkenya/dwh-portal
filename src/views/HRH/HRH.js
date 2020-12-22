import React from 'react';
import SectionHeader from '../Shared/SectionHeader';
import SectionFooter from '../Shared/SectionFooter';
import CIToHTSRatio from './CIToHTSRatio';
import DistributionDensityHCW from './DistributionDensityHCW';
import DistributionDensityNCK from './DistributionDensityNCK';
import DistributionDensityMPDB from './DistributionDensityMPDB';
import DistributionDensityCOC from './DistributionDensityCOC';
import DistributionHTSCI from './DistributionHTSCI';

const HRH = () => {
    const branding = { title: "HRH", description: "OVERVIEW", overview: "HRH" };
    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title}/>
            <DistributionDensityHCW/>
            <DistributionDensityNCK/>
            <DistributionHTSCI/>
            <CIToHTSRatio/>
            <DistributionDensityMPDB/>
            <DistributionDensityCOC/>
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default HRH;
