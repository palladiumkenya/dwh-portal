import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import UniversalFilter from '../../Shared/UniversalFilter';
import SectionHeader from '../../Shared/SectionHeader';
import SectionFooter from '../../Shared/SectionFooter';
import AdultArtOptimizationOverview from './AdultArtOptimizationOverview';
import AdultDistributionRegimenLines from './AdultDistributionRegimenLines';
import AdultDistributionRegimens from './AdultDistributionRegimens';
import AdultDistributionRegimenLinesByGender from './AdultDistributionRegimenLinesByGender';
import AdultRegimenUptakeTrends from './AdultRegimenUptakeTrends';
import AdultRegimenUptakeByCounty from './AdultRegimenUptakeByCounty';
import AdultRegimenUptakeByPartner from './AdultRegimenUptakeByPartner';
import AdultOverallTldUptake from './AdultOverallTldUptake';
import AdultMaleTldUptake from './AdultMaleTldUptake';
import AdultFemaleTldUptake from './AdultFemaleTldUptake';
import AdultTldUptakeByAgeGender from './AdultTldUptakeByAgeGender';
import AdultTldUptakeByCounty from './AdultTldUptakeByCounty';
import AdultTldUptakeByPartner from './AdultTldUptakeByPartner';
import ChildArtOptimizationOverview from './ChildArtOptimizationOverview';
import ChildDistributionRegimenLines from './ChildDistributionRegimenLines';
import ChildDistributionRegimens from './ChildDistributionRegimens';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import { loadArtOptimizationOverview } from '../../../actions/CT/ArtOptimization/artOptimizationActions';

const ArtOptimization = () => {
    const dispatch = useDispatch();
    const branding = { title: "ART OPTIMIZATION", description: "OVERVIEW", overview: "ART Optimization" };
    const ctTab = useSelector(state => state.ui.ctTab);
    const counties = useSelector(state => state.filters.counties);
    const subCounties = useSelector(state => state.filters.subCounties);
    const facilities = useSelector(state => state.filters.facilities);
    const partners = useSelector(state => state.filters.partners);
    const agencies = useSelector(state => state.filters.agencies);
    const projects = useSelector(state => state.filters.projects);

    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'txOptNew') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    useEffect(() => {
        dispatch(loadArtOptimizationOverview(counties, subCounties, facilities, partners, agencies, projects));
    }, [dispatch, counties, subCounties, facilities, partners, agencies, projects]);

    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title + " - ADULTS"}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <AdultArtOptimizationOverview />
            <Row>
                <Col><AdultDistributionRegimenLines/></Col>
                <Col><AdultDistributionRegimens/></Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <AdultDistributionRegimenLinesByGender/>
            <SectionFooter overview={branding.overview}/>
            <AdultRegimenUptakeTrends/>
            <SectionFooter overview={branding.overview}/>
            <AdultRegimenUptakeByCounty/>
            <SectionFooter overview={branding.overview}/>
            <AdultRegimenUptakeByPartner/>
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col sm={6}><AdultOverallTldUptake/></Col>
                <Col sm={3}><AdultMaleTldUptake/></Col>
                <Col sm={3}><AdultFemaleTldUptake/></Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
            <AdultTldUptakeByAgeGender/>
            <SectionFooter overview={branding.overview}/>
            <AdultTldUptakeByCounty/>
            <SectionFooter overview={branding.overview}/>
            <AdultTldUptakeByPartner/>
            <SectionHeader title={branding.title + " - CHILDREN"}/>
            <ChildArtOptimizationOverview />
            <Row>
                <Col><ChildDistributionRegimenLines/></Col>
                <Col><ChildDistributionRegimens/></Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
        </div>
    );

};

export default ArtOptimization;
