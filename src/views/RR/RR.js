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
    disableGenderFilter, disableDatimAgeGroupFilter
} from '../../actions/Shared/filterActions';
import { loadOverallReportingRatesByFacilityReported } from "../../actions/RR/overallReportingRatesByFacilityReported";
import { loadOverallReportingRatesByFacilityNotReported } from "../../actions/RR/overallReportingRatesByFacilityNotReported";
import { loadConsistencyByFacilityNotReported } from "../../actions/RR/consistencyByFacilityNotReported";
import { LOADING_DELAY, RR_TABS, PAGES } from "../../constants";
import Loading from './../Shared/Loading';
import UniversalFilter from '../Shared/UniversalFilter';
import SectionHeader from './../Shared/SectionHeader';
import SectionFooter from './../Shared/SectionFooter';

const RROverview = Loadable({ loader: () => import('./RROverview'), loading: Loading, delay: LOADING_DELAY });
const RROverviewTrends = Loadable({ loader: () => import('./RROverviewTrends'), loading: Loading, delay: LOADING_DELAY });
const RRCounty = Loadable({ loader: () => import('./RRCounty'), loading: Loading, delay: LOADING_DELAY });
const RRPartner = Loadable({ loader: () => import('./RRPartner'), loading: Loading, delay: LOADING_DELAY });
const RRIndicatorDefinition = Loadable({ loader: () => import('./RRIndicatorDefinition'), loading: Loading, delay: LOADING_DELAY });

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
                        <NavLink active={rrTab === value} onClick={() => { dispatch(changeRRTab(value)); }} >
                            {RR_TABS[value]}
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

    return (
        <div>
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={rrTab}>
                <TabPane tabId={rrTab}>
                    <SectionHeader title="REPORTING RATES" description="OVERVIEW"/>
                    <VisibilitySensor onChange={onVisibilityChange}>
                        <UniversalFilter/>
                    </VisibilitySensor>
                    <RRIndicatorDefinition />
                    <RROverview/>
                    <RROverviewTrends/>
                    <SectionFooter overview="The Overall reporting rates refers to the proportion of EMR
                        sites that submitted the most recent i.e. The Jan 2020 Overall
                        reporting rates in the number of EMR sites that uploaded data to
                        the NDW in Jan 2020 and so forth."
                    />
                    {/*<SectionHeader title="REPORTING RATES" description="BY COUNTY"/>*/}
                    <RRCounty/>
                    <SectionFooter overview="The overall reporting rate for March, 2020 is the
                        number of EMR sites that uploaded data in March, 2020"
                    />
                    {/*<SectionHeader title="REPORTING RATES" description="BY PARTNER"/>*/}
                    <RRPartner/>
                    <SectionFooter overview="The overall reporting rate for March, 2020 is the
                        number of EMR sites that uploaded data in March, 2020"
                    />
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );

};

export default RR;
