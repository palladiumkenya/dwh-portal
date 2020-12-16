import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import ArtOptimizationOverview from './ArtOptimizationOverview';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";

const ArtOptimization = () => {
    const branding = {
        title: "ART OPTIMIZATION",
        description: "OVERVIEW",
        overview: "ART Optimization"
    };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'txOptNew') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };
    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title + " - ADULTS"}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <ArtOptimizationOverview />
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default ArtOptimization;
