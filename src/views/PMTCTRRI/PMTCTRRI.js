import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import {
    changePmtctRRITab,
    changeCurrentPage,
} from '../../actions/Shared/uiActions';
import {
    enableFacilityFilter,
    disableFacilityFilter,
    enableAgencyFilter,
    disableAgencyFilter,
    enableFromDateFilter,
    disableFromDateFilter,
    disableGenderFilter,
    disableDatimAgeGroupFilter,
    enableDatimAgeGroupFilter,
    disableDatimAgePopulationFilter,
    enableEMRFilter,
    disableEMRFilter
} from '../../actions/Shared/filterActions';
import { LOADING_DELAY, PMTCT_RRI_TABS, PAGES } from '../../constants';
import Loading from '../Shared/Loading';
import { useHistory, useParams } from 'react-router-dom';
import { loadNewlyStartedOnArtKHIS } from '../../actions/Operational&HIS/Comparison/newlyStartedOnArtKHISActions';
import {
    loadNewlyStartedOnArtTrendsKHIS
} from '../../actions/Operational&HIS/Comparison/newlyStartedOnArtTrendsKHISActions';
import { loadCurrentNewOnArtOverview } from '../../actions/CT/NewOnArt/currentNewOnArtOverviewActions';
import { loadNewOnArtTrends } from '../../actions/CT/NewOnArt/newOnArtTrendsActions';
import { loadMissedFirstANCSDP } from '../../actions/PMTCTRRI/MissedFirstANC/missedFirstANCSDP';
import { loadMissedFirstANCGaps } from '../../actions/PMTCTRRI/MissedFirstANC/missedFirstANCGaps';
import { loadMissedFirstANCCounty } from '../../actions/PMTCTRRI/MissedFirstANC/missedFirstANCCounty';
import { loadMissedFirstANCOverview } from '../../actions/PMTCTRRI/MissedFirstANC/missedFirstANCOverview';
import { loadMissedHAARTOverview } from '../../actions/PMTCTRRI/MissedHAART/missedHAARTOverview';
import { loadMissedHAARTCounty } from './../../actions/PMTCTRRI/MissedHAART/missedHAARTCounty';
import { loadMissedHAARTFacility } from './../../actions/PMTCTRRI/MissedHAART/missedHAARTFacility';
import { loadMissedHAARTSDP } from './../../actions/PMTCTRRI/MissedHAART/missedHAARTSDP';
import { loadMissedEIDAgeFirstPCR } from '../../actions/PMTCTRRI/MissedEID/missedEIDAgeFirstPCR';
import { loadMissedEIDCounty } from '../../actions/PMTCTRRI/MissedEID/missedEIDCounty';
import { loadMissedEIDSDP } from '../../actions/PMTCTRRI/MissedEID/missedEIDSDP';
import { loadMissedEIDOverview } from './../../actions/PMTCTRRI/MissedEID/missedEIDOverview';
import { loadMissedInfantProphylaxis } from '../../actions/PMTCTRRI/MissedInfantProphylaxis/missedInfantProphylaxisAction';
import { loadMissedEIDMissingPCR } from '../../actions/PMTCTRRI/MissedEID/missedEIDMissingPCR';
import { loadMissedViralLoad } from '../../actions/PMTCTRRI/MissedViralLoad/missedViralLoadAction';
import { loadMissedDTG } from '../../actions/PMTCTRRI/MissedDTG/missedDTGAction';


const MissedDTG = Loadable({
    loader: () => import('./missedDTG/MissedDTG'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const MissedVL = Loadable({
    loader: () => import('./missedVL/MissedVL'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const MissedFirstANC = Loadable({
    loader: () => import('./missedFirstANC/MissedFirstANC'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const MissedHAART = Loadable({
    loader: () => import('./missedHAART/MissedHAART'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const MissedEID = Loadable({
    loader: () => import('./missedEID/MissedEID'),
    loading: Loading,
    delay: LOADING_DELAY,
});
const MissedInfantProf = Loadable({
    loader: () => import('./missedInfantProf/MissedInfantProf'),
    loading: Loading,
    delay: LOADING_DELAY,
});

const PMTCTRRI = () => {
    const dispatch = useDispatch();
    const pmtctRRItab = useSelector((state) => state.ui.pmtctRRITab);
    const counties = useSelector((state) => state.filters.counties);
    const subCounties = useSelector((state) => state.filters.subCounties);
    const facilities = useSelector((state) => state.filters.facilities);
    const partners = useSelector((state) => state.filters.partners);
    const agencies = useSelector((state) => state.filters.agencies);
    const projects = useSelector((state) => state.filters.projects);
    const fromDate = useSelector((state) => state.filters.fromDate);
    const toDate = useSelector((state) => state.filters.toDate);
    const genders = useSelector((state) => state.filters.genders);
    const datimAgeGroups = useSelector((state) => state.filters.datimAgeGroups);
    const emr = useSelector((state) => state.filters.emr);

    const renderTabNavItems = () => {
        return Object.keys(PMTCT_RRI_TABS).map((value) => {
            return (
                <NavItem key={value}>
                    <NavLink
                        active={active_tab === value}
                        onClick={() => {
                            dispatch(changePmtctRRITab(value));
                            toggle(value);
                        }}
                    >
                        <div style={{ fontSize: '.78em' }}>
                            {PMTCT_RRI_TABS[value]}
                        </div>
                    </NavLink>
                </NavItem>
            );
        });
    };
    const { active_tab } = useParams();

    useEffect(() => {
        dispatch(changeCurrentPage(PAGES.pmtctRRI));
        dispatch(enableFromDateFilter());
        dispatch(enableAgencyFilter());
        dispatch(enableFacilityFilter());
        dispatch(enableEMRFilter());
        dispatch(disableGenderFilter());
        dispatch(disableDatimAgeGroupFilter());
        dispatch(disableDatimAgePopulationFilter());
        
        if (active_tab === 'missedVL' ) {
            dispatch(enableDatimAgeGroupFilter());
            dispatch(disableFromDateFilter());
        } else if(active_tab === 'missedDTG') {
            dispatch(disableFromDateFilter());
        } else {
            dispatch(disableDatimAgeGroupFilter());
            dispatch(enableFromDateFilter());
        }

        return () => {
            dispatch(disableEMRFilter());
            dispatch(disableFromDateFilter());
        }
    }, [dispatch, active_tab]);

    useEffect(() => {
        dispatch(loadNewlyStartedOnArtKHIS());
        dispatch(loadNewlyStartedOnArtTrendsKHIS());
        dispatch(loadCurrentNewOnArtOverview());
        dispatch(loadNewOnArtTrends());

        dispatch(loadMissedFirstANCSDP());
        dispatch(loadMissedFirstANCGaps());
        dispatch(loadMissedFirstANCCounty());
        dispatch(loadMissedFirstANCOverview());

        dispatch(loadMissedHAARTOverview());
        dispatch(loadMissedHAARTCounty());
        dispatch(loadMissedHAARTSDP());
        dispatch(loadMissedHAARTFacility());

        dispatch(loadMissedEIDAgeFirstPCR());
        dispatch(loadMissedEIDCounty());
        dispatch(loadMissedEIDSDP());
        dispatch(loadMissedEIDOverview());
        dispatch(loadMissedEIDMissingPCR());

        dispatch(loadMissedInfantProphylaxis());

        dispatch(loadMissedViralLoad());

        dispatch(loadMissedDTG());
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
        pmtctRRItab,
        emr,
        active_tab,
    ]);

    const DEFAULT_ACTIVE_TAB = 'missedFirstANC';
    console.log(
        DEFAULT_ACTIVE_TAB,
        useSelector((state) => state.ui.pmtctRRITab)
    );
    const history = useHistory();
    useEffect(() => {
        if (!active_tab) {
            history.push(`/pmtct-rri/${DEFAULT_ACTIVE_TAB}`);
        }
    }, [active_tab, history, DEFAULT_ACTIVE_TAB]);

    if (!active_tab) {
        history.push(`/pmtct-rri/${pmtctRRItab}`);
    }

    const toggle = (tab) => {
        if (active_tab !== tab) {
            history.push(`/pmtct-rri/${tab}`);
        }
    };

    return (
        <div>
            <Nav tabs>{renderTabNavItems()}</Nav>
            <TabContent activeTab={active_tab}>
                <TabPane tabId={'missedFirstANC'}>
                    {active_tab === 'missedFirstANC' ? (
                        <MissedFirstANC />
                    ) : null}
                </TabPane>
                <TabPane tabId={'missedHAART'}>
                    {active_tab === 'missedHAART' ? <MissedHAART /> : null}
                </TabPane>
                <TabPane tabId={'missedInfantProf'}>
                    {active_tab === 'missedInfantProf' ? (
                        <MissedInfantProf />
                    ) : null}
                </TabPane>
                <TabPane tabId={'missedEID'}>
                    {active_tab === 'missedEID' ? <MissedEID /> : null}
                </TabPane>
                <TabPane tabId={'missedVL'}>
                    {active_tab === 'missedVL' ? <MissedVL /> : null}
                </TabPane>
                <TabPane tabId={'missedDTG'}>
                    {active_tab === 'missedDTG' ? <MissedDTG /> : null}
                </TabPane>
            </TabContent>
        </div>
    );
};

export default PMTCTRRI;
