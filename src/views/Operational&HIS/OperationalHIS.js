import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { changeOpertationalHISTab, changeCurrentPage } from '../../actions/Shared/uiActions';
import {
    enableFacilityFilter,
    disableFacilityFilter,
    enableAgencyFilter,
    disableAgencyFilter,
    enableFromDateFilter,
    disableFromDateFilter,
    disableGenderFilter,
    disableDatimAgeGroupFilter,
    enableIndicatorFilter,
    disableIndicatorFilter,
    enableGenderFilter,
    enableDatimAgeGroupFilter,
    disableDatimAgePopulationFilter
} from '../../actions/Shared/filterActions';
import { LOADING_DELAY, OPERATIONALHIS_TABS, PAGES } from '../../constants';
import Loading from '../Shared/Loading';
import { useHistory, useParams } from 'react-router-dom';
import { loadNewlyStartedOnArtKHIS } from '../../actions/Operational&HIS/Comparison/newlyStartedOnArtKHISActions';
import {
    loadNewlyStartedOnArtTrendsKHIS
} from '../../actions/Operational&HIS/Comparison/newlyStartedOnArtTrendsKHISActions';
import { loadCurrentNewOnArtOverview } from '../../actions/CT/NewOnArt/currentNewOnArtOverviewActions';
import { loadNewOnArtTrends } from '../../actions/CT/NewOnArt/newOnArtTrendsActions';
import { loadLinkagePositiveTrends } from '../../actions/HTS/Linkage/linkagePositiveTrendsActions';
import { loadHTSPositivesTrendsKHIS } from '../../actions/Operational&HIS/Comparison/htsPositivesTrendsKHISActions';
import { loadCurrOnARTKHIS } from '../../actions/Operational&HIS/Comparison/currOnArtKHISActions';
import { loadCurrOnARTKHISByCounty } from '../../actions/Operational&HIS/Comparison/currOnArtKHISByCountyActions';
import { loadCurrOnARTKHISByPartner } from '../../actions/Operational&HIS/Comparison/currOnArtKHISByPartnerActions';
import { loadCurrentOnArtDistributionByCountyDWH } from '../../actions/Operational&HIS/Comparison/currentOnArtDistributionByCountyActions';
import { loadCurrentOnArtOverview } from '../../actions/CT/CurrentOnArt/currentOnArtOverviewActions';
import { loadCurrentOnArtByAgeSex } from '../../actions/CT/CurrentOnArt/currentOnArtByAgeSexActions';
import { loadCurrentOnArtByCounty } from '../../actions/CT/CurrentOnArt/currentOnArtByCountyActions';
import { loadCurrentOnArtByPartner } from '../../actions/CT/CurrentOnArt/currentOnArtByPartnerActions';
import {
    loadCurrentOnArtDistributionByCounty
} from '../../actions/CT/CurrentOnArt/currentOnArtDistributionByCountyActions';
import {
    loadCurrentOnArtDistributionByPartner
} from '../../actions/CT/CurrentOnArt/currentOnArtDistributionByPartnerActions';
import { loadNewOnArtByAgeSex } from '../../actions/CT/NewOnArt/newOnArtByAgeSexActions';
import {
    loadCurrOnARTPartnerFacilityKHIS
} from '../../actions/Operational&HIS/Comparison/currOnArtByPartnerFacilityKHISActions';
import {
    loadNewOnARTPartnerFacilityKHIS
} from '../../actions/Operational&HIS/Comparison/newOnArtByPartnerFacilityKHISActions';
import {
    loadCurrOnARTPartnerFacilityDWH
} from '../../actions/Operational&HIS/Comparison/currOnArtByPartnerFacilityDWHActions';
import {
    loadNewOnARTPartnerFacilityDWH
} from '../../actions/Operational&HIS/Comparison/newOnArtByPartnerFacilityDWHActions';
import { loadHTSPosByGenderKHIS } from '../../actions/Operational&HIS/Comparison/htsPosByGenderKHISActions';
import { loadHTSPosByPartnerKHIS } from './../../actions/Operational&HIS/Comparison/htsPosByPartnerKHISActions';
import { loadHTSPosByCountyKHIS } from './../../actions/Operational&HIS/Comparison/htsPosByCountyKHISActions';


const Comparison = Loadable({
    loader: () => import ('./Comparison/Comparison'),
    loading: Loading,
    delay: LOADING_DELAY
});

const Overview = Loadable({
    loader: () => import ('./Overview/Overview'),
    loading: Loading,
    delay: LOADING_DELAY
});
const Accuracy = Loadable({
    loader: () => import ('./Accuracy/Accuracy'),
    loading: Loading,
    delay: LOADING_DELAY
});
const Completeness = Loadable({
    loader: () => import ('./Completeness/Completeness'),
    loading: Loading,
    delay: LOADING_DELAY
});
const Consistency = Loadable({
    loader: () => import ('./Consistency/Consistency'),
    loading: Loading,
    delay: LOADING_DELAY
});
const DataQualityAssessment = Loadable({
    loader: () => import ('./Data Quality Assessment/DataQualityAssessment'),
    loading: Loading,

    delay: LOADING_DELAY
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
    const genders = useSelector((state) => state.filters.genders);
    const datimAgeGroups = useSelector((state) => state.filters.datimAgeGroups);
    const indicator = useSelector(state => state.filters.indicator);


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
    const { active_tab } = useParams();

    useEffect(() => {
        dispatch(changeCurrentPage(PAGES.operationalHIS));
        dispatch(enableFromDateFilter());
        dispatch(enableGenderFilter());
        dispatch(enableDatimAgeGroupFilter());
        dispatch(disableDatimAgePopulationFilter());
        if (active_tab === 'comparison') {
            dispatch(enableIndicatorFilter());
            dispatch(disableFacilityFilter());
            dispatch(enableAgencyFilter());
        } else {
            dispatch(disableIndicatorFilter());
            dispatch(enableFacilityFilter());
            dispatch(disableAgencyFilter());

        }

    }, [dispatch, active_tab]);

    useEffect(() => {
        dispatch(loadNewlyStartedOnArtKHIS());
        dispatch(loadNewlyStartedOnArtTrendsKHIS());
        dispatch(loadCurrentNewOnArtOverview());
        dispatch(loadNewOnArtTrends());
        dispatch(loadNewOnArtByAgeSex());
        dispatch(loadCurrOnARTPartnerFacilityKHIS());
        dispatch(loadNewOnARTPartnerFacilityKHIS());
        dispatch(loadCurrOnARTPartnerFacilityDWH());
        dispatch(loadNewOnARTPartnerFacilityDWH());
        dispatch(loadLinkagePositiveTrends());
        dispatch(loadHTSPositivesTrendsKHIS());
        dispatch(loadCurrOnARTKHIS());
        dispatch(loadCurrOnARTKHISByCounty());
        dispatch(loadCurrOnARTKHISByPartner());
        dispatch(loadCurrentOnArtDistributionByCountyDWH());
        dispatch(loadHTSPosByGenderKHIS());
        dispatch(loadHTSPosByPartnerKHIS());
        dispatch(loadHTSPosByCountyKHIS());

        dispatch(loadCurrentOnArtOverview(active_tab));
        dispatch(loadCurrentOnArtByAgeSex(active_tab));
        dispatch(loadCurrentOnArtByCounty(active_tab));
        dispatch(loadCurrentOnArtByPartner(active_tab));
        dispatch(loadCurrentOnArtDistributionByCounty(active_tab));
        dispatch(loadCurrentOnArtDistributionByPartner(active_tab));
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
        genders,
        datimAgeGroups,
        opHIStab,
        indicator,
        active_tab,
    ]);

    const DEFAULT_ACTIVE_TAB = useSelector(
        (state) => state.ui.operationalHISTab
    );
    const history = useHistory();
    useEffect(() => {
        if (!active_tab) {
            history.push(`/operational-and-his/${DEFAULT_ACTIVE_TAB}`);
        }
    }, [active_tab, history, DEFAULT_ACTIVE_TAB]);

    if (!active_tab) {
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
                    {active_tab === 'overview' ? <Overview/> : null}
                </TabPane>
                <TabPane tabId={'completeness'}>
                    {active_tab === 'completeness' ? <Completeness/> : null}
                </TabPane>
                <TabPane tabId={'accuracy'}>
                    {active_tab === 'accuracy' ? <Accuracy/> : null}
                </TabPane>
                <TabPane tabId={'consistency'}>
                    {active_tab === 'consistency' ? <Consistency/> : null}
                </TabPane>
                <TabPane tabId={'dataQualityAssessment'}>
                    {active_tab === 'dataQualityAssessment' ? <DataQualityAssessment/> : null}
                </TabPane>
                <TabPane tabId={'comparison'}>
                    {active_tab === 'comparison' ? <Comparison/> : null}
                </TabPane>
            </TabContent>
        </div>
    );

};

export default OperationalHIS;
