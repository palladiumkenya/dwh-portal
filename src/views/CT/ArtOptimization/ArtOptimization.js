import React, { useState } from 'react';
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
import RegimenDistributionByWeightBands from './RegimenDistributionByWeightBands';
import RegimenDistributionByAgeBands from './RegimenDistributionByAgeBands';

const ArtOptimization = () => {
    const dispatch = useDispatch();
    const branding = { title: "ART OPTIMIZATION", description: "OVERVIEW", overview: "ART Optimization" };
    const [activeTab, setActiveTab] = useState('adults');
    const ctTab = useSelector(state => state.ui.ctTab);

    const onVisibilityChange = (isVisible) => {
        if (ctTab === 'txOpt') {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

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
                    <RegimenDistributionByWeightBands />
                    <SectionFooter overview={branding.overview}/>
                    <RegimenDistributionByAgeBands />
                    <SectionFooter overview={branding.overview}/>
                </TabPane>
            </TabContent>
        </div>
    );

};

export default ArtOptimization;
