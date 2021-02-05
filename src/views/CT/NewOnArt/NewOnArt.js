import React, { useEffect } from 'react';
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
import { loadNewOnArtOverview } from '../../../actions/CT/NewOnArt/newOnArtOverviewActions';
import { loadNewOnArtTrends } from '../../../actions/CT/NewOnArt/newOnArtTrendsActions';
import { loadNewOnArtByAgeSex } from '../../../actions/CT/NewOnArt/newOnArtByAgeSexActions';
import { loadMedianTimeToArtStartByYear } from '../../../actions/CT/NewOnArt/medianTimeToArtStartByYearActions';
import { loadMedianTimeToArtStartByCounty } from '../../../actions/CT/NewOnArt/medianTimeToArtStartByCountyActions';
import { loadMedianTimeToArtStartByPartner } from '../../../actions/CT/NewOnArt/medianTimeToArtStartByPartnerActions';
import { loadTimeFromDiagnosisToArtStart } from '../../../actions/CT/NewOnArt/timeFromDiagnosisToArtStartActions';

const NewOnArt = () => {
    const branding = { title: "NEWLY STARTED ON ART", description: "OVERVIEW", overview: "Newly Started on ART Information" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const counties = useSelector(state => state.filters.counties);
    const subCounties = useSelector(state => state.filters.subCounties);
    const facilities = useSelector(state => state.filters.facilities);
    const partners = useSelector(state => state.filters.partners);
    const agencies = useSelector(state => state.filters.agencies);
    const projects = useSelector(state => state.filters.projects);
    const fromDate = useSelector(state => state.filters.fromDate);
    const toDate = useSelector(state => state.filters.toDate);
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
    useEffect(() => {
        dispatch(loadNewOnArtOverview());
        dispatch(loadNewOnArtTrends());
        dispatch(loadNewOnArtByAgeSex());
        dispatch(loadMedianTimeToArtStartByYear());
        dispatch(loadMedianTimeToArtStartByCounty());
        dispatch(loadMedianTimeToArtStartByPartner());
        dispatch(loadTimeFromDiagnosisToArtStart());
    }, [
        dispatch,
        counties,
        subCounties,
        facilities,
        partners,
        agencies,
        projects,
        fromDate,
        toDate,
        ctTab
    ]);
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
