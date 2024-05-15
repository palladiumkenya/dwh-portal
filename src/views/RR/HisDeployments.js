import HisDeploymentsOverview from './HisDeploymentsOverview';
import HisDeploymentsEMRStatusByPartner from './HisDeploymentsEMRStatusByPartner';
import HisDeploymentsFacilityLevelByOwnershipPartner from './HisDeploymentsFacilityLevelByOwnershipPartner';
import HisDeploymentsFacilityLevelByOwnershipCounty from './HisDeploymentsFacilityLevelByOwnershipCounty';
import HisDeploymentsFacilityByInfrastructure from './HisDeploymentsFacilityByInfrastructure';
import HisDeploymentsLinelist from './HisDeploymentsLinelist';
import SectionHeader from '../Shared/SectionHeader';
import React from 'react';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../Shared/UniversalFilter';
import { disableStickyFilter, enableStickyFilter } from '../../actions/Shared/uiActions';
import { useDispatch } from 'react-redux';

const HisDeployments = () =>{
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());
        }
    };
    return (
        <>
            <SectionHeader title="HIS Deployments" description={`Year ${moment().format('YYYY')}`}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <HisDeploymentsOverview />
            <HisDeploymentsEMRStatusByPartner />
            <HisDeploymentsFacilityLevelByOwnershipPartner />
            <HisDeploymentsFacilityLevelByOwnershipCounty />
            <HisDeploymentsFacilityByInfrastructure />
            <HisDeploymentsLinelist />
        </>
    )
}


export default HisDeployments
