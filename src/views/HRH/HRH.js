import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SectionHeader from '../Shared/SectionHeader';
import SectionFooter from '../Shared/SectionFooter';
import CIToHTSRatio from './CIToHTSRatio';
import DistributionDensityHCW from './DistributionDensityHCW';
import DistributionDensityNCK from './DistributionDensityNCK';
import DistributionDensityMPDB from './DistributionDensityMPDB';
import DistributionDensityCOC from './DistributionDensityCOC';
import DistributionHTSCI from './DistributionHTSCI';
import { loadPractitionersCountByCountyQualification } from '../../actions/HRH/practitionersCountByCountyQualification';
import { loadPopulationByCounty } from '../../actions/HRH/populationByCounty';
import { loadUptakeByCounty } from '../../actions/HTS/Uptake/uptakeByCounty';

const HRH = () => {
    const branding = { title: "HRH", description: "OVERVIEW", overview: "HRH" };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPractitionersCountByCountyQualification());
        dispatch(loadPopulationByCounty());
        dispatch(loadUptakeByCounty());
    }, [dispatch]);

    return (
        <div className="animated fadeIn">
            {/*
                TODO:
                - hts/use testing and positive
                - add county name to scatter
                - number
                - HCW supporting HIV
                - NASCOP HRIS
                - Supporting services
            */}
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
