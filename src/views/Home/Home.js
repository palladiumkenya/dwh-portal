import React from 'react';
import { Col, Row } from 'reactstrap';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import UniversalFilter from '../Shared/UniversalFilter';
import HomeTxNew from './HomeTxNew';
import HomeVLCascade from './HomeVLCascade';
import HomeAgeDistribution from './HomeAgeDistribution';
import HomeSexDistribution from './HomeSexDistribution';
import VisibilitySensor from 'react-visibility-sensor';
import HomeOverview from './HomeOverview';
import HomeMaps from './HomeMaps';
import * as uiActions from "../../store/actions/uiActions";

const Home = () => {
    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            uiActions.disableStickyFilter();
        } else {
            uiActions.enableStickyFilter();
        }
    };
    const onVisibilityChangeOnCTHomeTxNew = (isVisible) => {
        if (isVisible) {
            uiActions.enableFromDateFilter();
            uiActions.disableToDateFilter();
        } else {
            uiActions.disableFromDateFilter();
            uiActions.enableToDateFilter();
        }
    };

    return (
        <div className="animated fadeIn">
            <br></br>
            <div className="strip"></div>
            <HomeHeader/>
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
            <hr />
            <HomeFooter />
            <hr /><div className="strip">&nbsp;</div><p>&nbsp;</p>
            <VisibilitySensor onChange={onVisibilityChangeOnCTHomeTxNew}>
                <HomeTxNew/>
            </VisibilitySensor>
            <hr />
            <HomeFooter />
            <hr /><div className="strip">&nbsp;</div><p>&nbsp;</p>
        </div>
    );
};

export default Home;
