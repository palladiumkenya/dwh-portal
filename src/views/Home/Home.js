import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import Loadable from 'react-loadable';
import { enableStickyFilter, disableStickyFilter, changeCurrentPage } from "../../actions/Shared/uiActions";
import { disableFromDateFilter, disableToDateFilter } from "../../actions/Shared/filterActions";
import { loadCurrentOnArtOverview } from '../../actions/CT/CurrentOnArt/currentOnArtOverviewActions';
import { loadCurrentOnArtByAgeSex } from '../../actions/CT/CurrentOnArt/currentOnArtByAgeSexActions';
import { loadGpsSites } from '../../actions/Home/gpsSitesActions';
import { LOADING_DELAY, PAGES } from './../../constants';
import Loading from './../Shared/Loading';
import SectionHeader from './../Shared/SectionHeader';
import SectionFooter from './../Shared/SectionFooter';
import UniversalFilter from '../Shared/UniversalFilter';

import {
    enableFromDateFilter,
    enableToDateFilter,
    enableGenderFilter,
    disableGenderFilter,
    enableDatimAgeGroupFilter,
    disableDatimAgeGroupFilter,
    enableLatestPregnancyFilter,
    disableLatestPregnancyFilter,
    enablePopulationTypeFilter,
    disablePopulationTypeFilter,
    enableAgencyFilter
} from "../../actions/Shared/filterActions";

const HomeVLCascade = Loadable({ loader: () => import('./HomeVLCascade'), loading: Loading, delay: LOADING_DELAY });
const HomeAgeDistribution = Loadable({ loader: () => import('./HomeAgeDistribution'), loading: Loading, delay: LOADING_DELAY });
const HomeOverview = Loadable({ loader: () => import('./HomeOverview'), loading: Loading, delay: LOADING_DELAY });
const HomeMaps = Loadable({ loader: () => import('./HomeMaps'), loading: Loading, delay: LOADING_DELAY });

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
        dispatch(disableToDateFilter());
        dispatch(enableGenderFilter());
        dispatch(enableDatimAgeGroupFilter());
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadCurrentOnArtOverview());
        dispatch(loadCurrentOnArtByAgeSex());
        dispatch(loadGpsSites());
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
            <SectionFooter overview={branding.overview}/>
        </div>
    );
};

export default Home;
