import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import UptakeOverview from './UptakeOverview';
import UptakeByAgeSex from './UptakeByAgeSex';
import UptakeByCounty from './UptakeByCounty';
import UptakeByPartner from './UptakeByPartner';
import UptakeMonthsSinceLastTest from './UptakeMonthsSinceLastTest';
import UptakeTBScreeningAndTBOutcome from './UptakeTBScreeningAndTBOutcome';
import UptakeTestingStrategy from './UptakeTestingStrategy';
import UptakeTypeAndSelfTest from './UptakeTypeAndSelfTest';
import UptakeNumberTestedAndPositivity from './UptakeNumberTestedAndPositivity';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import HtsUptakeIndicatorDefinition from './HtsUptakeIndicatorDefinition';

const Uptake = () => {
    const dispatch = useDispatch();
    const branding = {
        title: "HIV TESTING SERVICES UPTAKE",
        description: "OVERVIEW",
        overview: "HTS Uptake"
    };
    const htsTab = useSelector(state => state.ui.htsTab);
    const onVisibilityChange = (isVisible) => {
        if (htsTab === 'uptake') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title} description={branding.description}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <HtsUptakeIndicatorDefinition />
            <UptakeOverview/>
            <UptakeNumberTestedAndPositivity/>
            <SectionFooter overview={branding.overview}/>
            <UptakeByAgeSex/>
            <SectionFooter overview={branding.overview}/>
            {/*<UptakeByPopulationType/>*/}
            {/*<SectionFooter overview={branding.overview}/>*/}
            <UptakeTestingStrategy/>
            <SectionFooter overview={branding.overview}/>
            <UptakeByCounty/>
            <SectionFooter overview={branding.overview}/>
            <UptakeByPartner/>
            <SectionFooter overview={branding.overview}/>
            <UptakeTypeAndSelfTest/>
            <SectionFooter overview={branding.overview}/>
            <UptakeMonthsSinceLastTest/>
            <SectionFooter overview={branding.overview}/>
            <UptakeTBScreeningAndTBOutcome/>
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default Uptake;
