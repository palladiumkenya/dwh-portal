import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from './../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import NewOnArtOverview from './NewOnArtOverview';
import NewOnArtTrends from './NewOnArtTrends';
import NewOnArtByAgeSex from './NewOnArtByAgeSex';
import MedianTimeToArtStartByYear from './MedianTimeToArtStartByYear';
import MedianTimeToArtStartByCounty from './MedianTimeToArtStartByCounty';
import MedianTimeToArtStartByPartner from './MedianTimeToArtStartByPartner';
import TimeFromDiagnosisToArtStart from './TimeFromDiagnosisToArtStart';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";

const NewOnArt = () => {
    const branding = { title: "NEWLY STARTED ON ART", description: "OVERVIEW", overview: "Newly Started on ART Information" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const dispatch = useDispatch();
    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'txNew') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor><p></p>
            <NewOnArtOverview /><p></p>
            <NewOnArtTrends />
            <SectionFooter overview={branding.overview}/>
            <NewOnArtByAgeSex />
            <SectionFooter overview={branding.overview}/>
            <MedianTimeToArtStartByYear />
            <SectionFooter overview={branding.overview}/>
            <MedianTimeToArtStartByCounty />
            <SectionFooter overview={branding.overview}/>
            <MedianTimeToArtStartByPartner />
            <SectionFooter overview={branding.overview}/>
            <TimeFromDiagnosisToArtStart />
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default NewOnArt;
