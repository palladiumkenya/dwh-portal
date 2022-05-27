import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row } from 'reactstrap';
import { enableStickyFilter, disableStickyFilter } from "../../../actions/Shared/uiActions";
import { LOADING_DELAY } from "../../../constants";
import Loading from './../../Shared/Loading';
import SectionFooter from '../../Shared/SectionFooter';
import SectionHeader from '../../Shared/SectionHeader';
import UniversalFilter from '../../Shared/UniversalFilter';
import { useHistory, useParams } from 'react-router-dom';

const AdultArtOptimizationOverview = Loadable({ loader: () => import('./AdultArtOptimizationOverview'), loading: Loading, delay: LOADING_DELAY });
const AdultDistributionRegimenLines = Loadable({ loader: () => import('./AdultDistributionRegimenLines'), loading: Loading, delay: LOADING_DELAY });
const AdultDistributionRegimenLinesByGender = Loadable({ loader: () => import('./AdultDistributionRegimenLinesByGender'), loading: Loading, delay: LOADING_DELAY });
const AdultDistributionRegimens = Loadable({ loader: () => import('./AdultDistributionRegimens'), loading: Loading, delay: LOADING_DELAY });
const AdultFemaleTldUptake = Loadable({ loader: () => import('./AdultFemaleTldUptake'), loading: Loading, delay: LOADING_DELAY });
const AdultMaleTldUptake = Loadable({ loader: () => import('./AdultMaleTldUptake'), loading: Loading, delay: LOADING_DELAY });
const AdultOverallTldUptake = Loadable({ loader: () => import('./AdultOverallTldUptake'), loading: Loading, delay: LOADING_DELAY });
const AdultRegimenUptakeByCounty = Loadable({ loader: () => import('./AdultRegimenUptakeByCounty'), loading: Loading, delay: LOADING_DELAY });
const AdultRegimenUptakeByPartner = Loadable({ loader: () => import('./AdultRegimenUptakeByPartner'), loading: Loading, delay: LOADING_DELAY });
const AdultTldUptakeByAgeGender = Loadable({ loader: () => import('./AdultTldUptakeByAgeGender'), loading: Loading, delay: LOADING_DELAY });
const AdultTldUptakeByCounty = Loadable({ loader: () => import('./AdultTldUptakeByCounty'), loading: Loading, delay: LOADING_DELAY });
const AdultTldUptakeByPartner = Loadable({ loader: () => import('./AdultTldUptakeByPartner'), loading: Loading, delay: LOADING_DELAY });
const ChildArtOptimizationOverview = Loadable({ loader: () => import('./ChildArtOptimizationOverview'), loading: Loading, delay: LOADING_DELAY });
const ChildDistributionRegimenLines = Loadable({ loader: () => import('./ChildDistributionRegimenLines'), loading: Loading, delay: LOADING_DELAY });
const ChildDistributionRegimens = Loadable({ loader: () => import('./ChildDistributionRegimens'), loading: Loading, delay: LOADING_DELAY });
const RegimenDistributionByAgeBands = Loadable({ loader: () => import('./RegimenDistributionByAgeBands'), loading: Loading, delay: LOADING_DELAY });
const RegimenDistributionByWeightBands = Loadable({ loader: () => import('./RegimenDistributionByWeightBands'), loading: Loading, delay: LOADING_DELAY });

const ArtOptimization = () => {
    const dispatch = useDispatch();
    const branding = { title: "ART OPTIMIZATION", description: "OVERVIEW", overview: "ART Optimization" };
    const [activeTab, setActiveTab] = useState('adults');
    const { active_tab } = useParams();
    const ctTab = active_tab

    const onVisibilityChange = (isVisible) => {
        if (ctTab === "artOptimization") {
            if (isVisible) {
                dispatch(disableStickyFilter());
            } else {
                dispatch(enableStickyFilter());
            }
        }
    };

    const { mini_tab } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (!mini_tab) {
            history.push(`/hiv-treatment/artOptimization/${activeTab}`);
        }
    }, [activeTab, history, mini_tab]);

    if(!mini_tab){
        history.push(`/hiv-treatment/artOptimization/${activeTab}`);
    }

    const toggle = tab => {
        if (mini_tab !== tab) {
            history.push(`/hiv-treatment/artOptimization/${tab}`);
        }
    };


    return (
        <div className="animated fadeIn">
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'adults' })} onClick={() => { setActiveTab('adults'); toggle("adults") }}>ADULTS</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: mini_tab === 'children' })} onClick={() => { setActiveTab('children'); toggle("children") }}>CALHIV</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={mini_tab}>
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
