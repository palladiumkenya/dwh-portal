import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import SectionHeader from './../Shared/SectionHeader';
import SectionFooter from './../Shared/SectionFooter';
import UniversalFilter from '../Shared/UniversalFilter';
import HomeTxNew from './HomeTxNew';
import HomeOverallMmdUptake from './HomeOverallMmdUptake';
import HomeMmdUptakeBySex from './HomeMmdUptakeBySex';
import HomeVLCascade from './HomeVLCascade';
import HomeAgeDistribution from './HomeAgeDistribution';
import HomeSexDistribution from './HomeSexDistribution';
import VisibilitySensor from 'react-visibility-sensor';
import HomeOverview from './HomeOverview';
import HomeMaps from './HomeMaps';
import { enableStickyFilter, disableStickyFilter, changeCurrentPage, enableFromDateFilter, disableFromDateFilter } from "../../actions/Shared/uiActions";
import { loadCurrentOnArtOverview } from '../../actions/CT/CurrentOnArt/currentOnArtOverviewActions';
import { loadCurrentOnArtByAgeSex } from '../../actions/CT/CurrentOnArt/currentOnArtByAgeSexActions';
import { PAGES } from './../../constants';

const Home = () => {
    const branding = { title: "HOME", description: "HMIS STATISTICS", overview: "HMIS Statistics" };
    const page = useSelector(state => state.ui.currentPage);
    const counties = useSelector(state => state.filters.counties);
    const subCounties = useSelector(state => state.filters.subCounties);
    const facilities = useSelector(state => state.filters.facilities);
    const partners = useSelector(state => state.filters.partners);
    const agencies = useSelector(state => state.filters.agencies);
    const projects = useSelector(state => state.filters.projects);
    const dispatch = useDispatch();

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());
        }
    };

    useEffect(() => {
        dispatch(changeCurrentPage(PAGES.home));
        dispatch(disableFromDateFilter());
        return () => {
            dispatch(enableFromDateFilter());
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadCurrentOnArtOverview());
        dispatch(loadCurrentOnArtByAgeSex());
    }, [
        dispatch,
        counties,
        subCounties,
        facilities,
        partners,
        agencies,
        projects,
        page
    ]);
    
    return (
        <div className="animated fadeIn">
            <SectionHeader title={branding.title} description={branding.description}/>
            <VisibilitySensor onChange={onVisibilityChange}>
                <UniversalFilter/>
            </VisibilitySensor>
            <HomeVLCascade/>
            <Row>
                <Col xl={3} lg={3} md={12} sm={12} xs={12}>
                    <HomeAgeDistribution/>
                </Col>
                <Col xl={6} lg={6} md={12} sm={12} xs={12}>
                    <HomeMaps/>
                </Col>
                <Col xl={3} lg={3} md={12} sm={12} xs={12}>
                    <HomeOverview />
                </Col>
            </Row>
            <HomeSexDistribution/>
            <SectionFooter overview={branding.overview}/>
            <HomeTxNew/>
            <SectionFooter overview={branding.overview}/>
            <Row>
                <Col sm={6}>
                    <HomeOverallMmdUptake/>
                </Col>
                <Col sm={6}>
                    <HomeMmdUptakeBySex/>
                </Col>
            </Row>
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default Home;
