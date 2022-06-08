import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { enableStickyFilter, disableStickyFilter, changeOpertationalHISTab, changeCurrentPage } from "../../actions/Shared/uiActions";
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
import UniversalFilter from '../Shared/UniversalFilter';
import SectionHeader from '../Shared/SectionHeader';
import SectionFooter from '../Shared/SectionFooter';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';


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

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            dispatch(disableStickyFilter());
        } else {
            dispatch(enableStickyFilter());
        }
    };

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
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={active_tab}>
                <TabPane tabId={active_tab}>
                    
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );

};

export default OperationalHIS;
