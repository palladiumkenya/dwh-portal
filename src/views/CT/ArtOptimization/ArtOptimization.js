import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import classnames from 'classnames';
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
import { loadArtOptimizationOverview } from '../../../actions/CT/ArtOptimization/artOptimizationOverviewActions';
import { loadArtOptimizationCurrentByRegimen } from '../../../actions/CT/ArtOptimization/artOptimizationCurrentByRegimenActions';
import { loadArtOptimizationCurrentByAgeSex } from '../../../actions/CT/ArtOptimization/artOptimizationCurrentByAgeSexActions';
import { loadArtOptimizationCurrentByCounty } from '../../../actions/CT/ArtOptimization/artOptimizationCurrentByCountyActions';
import { loadArtOptimizationCurrentByPartner } from '../../../actions/CT/ArtOptimization/artOptimizationCurrentByPartnerActions';

const ArtOptimization = () => {
    const dispatch = useDispatch();
    const branding = { title: "ART OPTIMIZATION", description: "OVERVIEW", overview: "ART Optimization" };
    const [activeTab, setActiveTab] = useState('adults');
    const ctTab = useSelector(state => state.ui.ctTab);
    const counties = useSelector(state => state.filters.counties);
    const subCounties = useSelector(state => state.filters.subCounties);
    const facilities = useSelector(state => state.filters.facilities);
    const partners = useSelector(state => state.filters.partners);
    const agencies = useSelector(state => state.filters.agencies);
    const projects = useSelector(state => state.filters.projects);

    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'txOpt') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    useEffect(() => {
        dispatch(loadArtOptimizationOverview(counties, subCounties, facilities, partners, agencies, projects));
        dispatch(loadArtOptimizationCurrentByRegimen(counties, subCounties, facilities, partners, agencies, projects));
        dispatch(loadArtOptimizationCurrentByAgeSex(counties, subCounties, facilities, partners, agencies, projects));
        dispatch(loadArtOptimizationCurrentByCounty(counties, subCounties, facilities, partners, agencies, projects));
        dispatch(loadArtOptimizationCurrentByPartner(counties, subCounties, facilities, partners, agencies, projects));
    }, [dispatch, counties, subCounties, facilities, partners, agencies, projects]);

    return (
        <div className="animated fadeIn">
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'adults' })} onClick={() => { setActiveTab('adults') }}>ADULTS</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'children' })} onClick={() => { setActiveTab('children') }}>CALHIV</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="adults">
                    <SectionHeader title={branding.title + " - ADULTS"}/>
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
                </TabPane>
                <TabPane tabId="children">
                    <SectionHeader title={branding.title + " - CHILDREN"}/>
                    <ChildArtOptimizationOverview />
                    <Row>
                        <Col><ChildDistributionRegimenLines/></Col>
                        <Col><ChildDistributionRegimens/></Col>
                    </Row>
                    <SectionFooter overview={branding.overview}/>
                </TabPane>
            </TabContent>
        </div>
    );

};

export default ArtOptimization;
