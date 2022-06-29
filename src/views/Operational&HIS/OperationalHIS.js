import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { changeOpertationalHISTab, changeCurrentPage } from "../../actions/Shared/uiActions";
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
import { LOADING_DELAY, OPERATIONALHIS_TABS, PAGES } from "../../constants";
import Loading from '../Shared/Loading';
import { useHistory, useParams } from 'react-router-dom';

const Comparison = Loadable({
    loader: () => import ('./Comparison/Comparison'),
    loading: () => Loading,
    delay: LOADING_DELAY,
});

const Overview = Loadable({
    loader: () => import ('./Overview/Overview'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const Accuracy = Loadable({
    loader: () => import ('./Accuracy/Accuracy'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const Completeness = Loadable({
    loader: () => import ('./Completeness/Completeness'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const Consistency = Loadable({
    loader: () => import ('./Consistency/Consistency'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const DataQualityAssessment = Loadable({
    loader: () => import ('./Data Quality Assessment/DataQualityAssessment'),
    loading: Loading,
    delay: LOADING_DELAY,
});

const OperationalHIS = () => {
    const dispatch = useDispatch();
    const opHIStab = useSelector((state) => state.ui.operationalHISTab);
    const counties = useSelector(state => state.filters.counties);
    const subCounties = useSelector(state => state.filters.subCounties);
    const facilities = useSelector(state => state.filters.facilities);
    const partners = useSelector(state => state.filters.partners);
    const agencies = useSelector(state => state.filters.agencies);
    const projects = useSelector(state => state.filters.projects);
    const fromDate = useSelector(state => state.filters.fromDate);
    const toDate = useSelector(state => state.filters.toDate);


    const renderTabNavItems = () => {
        return Object.keys(OPERATIONALHIS_TABS).map((value) => {
            return (
                <NavItem key={value}>
                    <NavLink
                        active={active_tab === value}
                        onClick={() => {
                            dispatch(changeOpertationalHISTab(value));
                            toggle(value);
                        }}
                    >
                        {OPERATIONALHIS_TABS[value]}
                    </NavLink>
                </NavItem>
            );
        });
    };

    useEffect(() => {
        dispatch(changeCurrentPage(PAGES.operationalHIS));
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
        opHIStab,
    ]);

    const DEFAULT_ACTIVE_TAB = useSelector(
        (state) => state.ui.operationalHISTab
    );
    const { active_tab } = useParams();
    const history = useHistory();
    useEffect(() => {
        if (!active_tab) {
            history.push(`/operational-and-his/${DEFAULT_ACTIVE_TAB}`);
        }
    }, []);

    if(!active_tab){
        history.push(`/operational-and-his/${opHIStab}`);
    }

    const toggle = tab => {
        if (active_tab !== tab) {
            history.push(`/operational-and-his/${tab}`);
        }
    };

    return (
        <div>
            <Nav tabs>{renderTabNavItems()}</Nav>
            <TabContent activeTab={active_tab}>
                <TabPane tabId={'overview'}>
                    {active_tab === 'overview' ? <Overview /> : null}
                </TabPane>
                <TabPane tabId={'completeness'}>
                    {active_tab === 'completeness' ? <Completeness /> : null}
                </TabPane>
                <TabPane tabId={'accuracy'}>
                    {active_tab === 'accuracy' ? <Accuracy /> : null}
                </TabPane>
                <TabPane tabId={'consistency'}>
                    {active_tab === 'consistency' ? <Consistency /> : null}
                </TabPane>
                <TabPane tabId={'dataQualityAssessment'}>
                    {active_tab === 'dataQualityAssessment' ? <DataQualityAssessment /> : null}
                </TabPane>
                <TabPane tabId={'comparison'}>
                    {active_tab === 'comparison' ? <Comparison /> : null}
                </TabPane>
            </TabContent>
        </div>
    );

};

export default OperationalHIS;
