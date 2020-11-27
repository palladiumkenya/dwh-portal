import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import LinkageNumberPositive from './LinkageNumberPositive';
import LinkageByAgeSex from './LinkageByAgeSex';
import LinkageByPopulationType from './LinkageByPopulationType';
import LinkageByStrategyEntryPoint from './LinkageByStrategyEntryPoint';
import LinkageByPartner from './LinkageByPartner';
import LinkageByCounty from './LinkageByCounty';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/uiActions";

const Linkage = () => {
    const dispatch = useDispatch();
    const branding = {
        title: "HIV TESTING SERVICES LINKAGE",
        description: "OVERVIEW",
        overview: "HTS Uptake is defined as the rate at which individuals take up HIV Tests."
    };
    const htsTab = useSelector(state => state.ui.htsTab);

    const onVisibilityChange = (isVisible) => {
        if (htsTab === 'linkage') {
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
            <LinkageNumberPositive/>
            <SectionFooter overview={branding.overview}/>
            <LinkageByAgeSex />
            <SectionFooter overview={branding.overview}/>
            <LinkageByPopulationType/>
            <SectionFooter overview={branding.overview}/>
            <LinkageByStrategyEntryPoint/>
            <SectionFooter overview={branding.overview}/>
            <LinkageByCounty/>
            <SectionFooter overview={branding.overview}/>
            <LinkageByPartner/>
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default Linkage;
