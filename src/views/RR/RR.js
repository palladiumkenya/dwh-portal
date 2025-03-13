import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { enableStickyFilter, disableStickyFilter, changeRRTab, changeCurrentPage } from "../../actions/Shared/uiActions";
import {
    enableFacilityFilter,
    disableFacilityFilter,
    enableAgencyFilter,
    disableAgencyFilter,
    enableFromDateFilter,
    disableFromDateFilter,
    disableGenderFilter, disableDatimAgeGroupFilter, disableDatimAgePopulationFilter
} from '../../actions/Shared/filterActions';
import { loadOverallReportingRatesByFacilityReported } from "../../actions/RR/overallReportingRatesByFacilityReported";
import { loadOverallReportingRatesByFacilityNotReported } from "../../actions/RR/overallReportingRatesByFacilityNotReported";
import { loadConsistencyByFacilityNotReported } from "../../actions/RR/consistencyByFacilityNotReported";
import { LOADING_DELAY, RR_TABS, PAGES } from "../../constants";
import Loading from './../Shared/Loading';
import UniversalFilter from '../Shared/UniversalFilter';
import SectionHeader from './../Shared/SectionHeader';
import { useHistory, useParams } from 'react-router-dom';


const RRTab = Loadable({ loader: () => import('./RRTab'), loading: Loading, delay: LOADING_DELAY });
const HisDeployments = Loadable({ loader: () => import('./HisDeployments'), loading: Loading, delay: LOADING_DELAY });

const RR = () => {
    const dispatch = useDispatch();
    const rrTab = useSelector(state => state.ui.rrTab);
    const counties = useSelector(state => state.filters.counties);
    const subCounties = useSelector(state => state.filters.subCounties);
    const facilities = useSelector(state => state.filters.facilities);
    const partners = useSelector(state => state.filters.partners);
    const agencies = useSelector(state => state.filters.agencies);
    const projects = useSelector(state => state.filters.projects);
    const fromDate = useSelector(state => state.filters.fromDate);
    const toDate = useSelector(state => state.filters.toDate);

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());
        }
    };

    const renderTabNavItems = () => {
        return (
            Object.keys(RR_TABS).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={active_tab === value} onClick={() => {
                            dispatch(changeRRTab(value));
                            toggle(value);
                        }} >
                            <div style={{ fontSize: '.78em' }}>
                                {RR_TABS[value]}
                            </div>
                        </NavLink>
                    </NavItem>
                );
            })
        );
    };

    useEffect(() => {
        dispatch(changeCurrentPage(PAGES.rr));
        dispatch(disableFacilityFilter());
        dispatch(enableAgencyFilter());
        dispatch(enableFromDateFilter());
        dispatch(disableGenderFilter());
        dispatch(disableDatimAgeGroupFilter());
        dispatch(disableDatimAgePopulationFilter());
        return () => {
            dispatch(enableFacilityFilter());
            dispatch(disableAgencyFilter());
            dispatch(disableFromDateFilter());
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadOverallReportingRatesByFacilityReported());
        dispatch(loadOverallReportingRatesByFacilityNotReported());
        dispatch(loadConsistencyByFacilityNotReported());
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
        rrTab
    ]);

    const DEFAULT_ACTIVE_TAB = useSelector(state => state.ui.rrTab);
    const { active_tab } = useParams();
    const history = useHistory();
    useEffect(() => {
        if (!active_tab) {
            history.push(`/reporting-rates/${DEFAULT_ACTIVE_TAB}`);
        }
    }, [DEFAULT_ACTIVE_TAB]);

    if(!active_tab){
        history.push(`/reporting-rates/${rrTab}`);
    }

    const toggle = tab => {
        if (active_tab !== tab) {
            history.push(`/reporting-rates/${tab}`);
        }
    };

    return (
        <div>
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={active_tab}>
                <TabPane tabId={'ct'}>
                    <SectionHeader title="REPORTING RATES" description="OVERVIEW"/>
                    <VisibilitySensor onChange={onVisibilityChange}>
                        <UniversalFilter/>
                    </VisibilitySensor>
                    <RRTab/>
                </TabPane>
                <TabPane tabId={'hts'}>
                    <SectionHeader title="REPORTING RATES" description="OVERVIEW"/>
                    <VisibilitySensor onChange={onVisibilityChange}>
                        <UniversalFilter/>
                    </VisibilitySensor>
                    <RRTab/>
                </TabPane>
                {/*<TabPane tabId={'his'}>*/}
                {/*    <HisDeployments/>*/}
                {/*</TabPane>*/}
            </TabContent>
            <p></p><p></p>
        </div>
    );

};

export default RR;
