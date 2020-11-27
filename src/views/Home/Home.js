import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import SectionHeader from './../Shared/SectionHeader';
import SectionFooter from './../Shared/SectionFooter';
import UniversalFilter from '../Shared/UniversalFilter';
import HomeTxNew from './HomeTxNew';
import HomeVLCascade from './HomeVLCascade';
import HomeAgeDistribution from './HomeAgeDistribution';
import HomeSexDistribution from './HomeSexDistribution';
import VisibilitySensor from 'react-visibility-sensor';
import HomeOverview from './HomeOverview';
import HomeMaps from './HomeMaps';
import { enableStickyFilter, disableStickyFilter } from "../../actions/uiActions";

const Home = () => {
    const branding = { title: "HOME", description: "HMIS STATISTICS", overview: "HMIS Statistics" };
    const dispatch = useDispatch();

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());
        }
    };
    
    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title} description={branding.description}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <HomeVLCascade/>
            <Row>
                <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                    <HomeAgeDistribution/>
                </Col>
                <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                    <HomeMaps/>
                </Col>
                <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                    <HomeOverview />
                </Col>
            </Row>
            <HomeSexDistribution/>
            <SectionFooter overview={branding.overview}/>
            <HomeTxNew/>
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default Home;
