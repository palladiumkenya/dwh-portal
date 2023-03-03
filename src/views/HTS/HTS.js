import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { HTS_TABS, PAGES, LOADING_DELAY } from './../../constants';
import { changeHtsTab, changeCurrentPage } from './../../actions/Shared/uiActions';
import { enableFromDateFilter, disableFromDateFilter, enableAgencyFilter, enableToDateFilter, disableDatimAgePopulationFilter } from './../../actions/Shared/filterActions';
import { loadLinkageNumberNotLinkedByFacility } from '../../actions/HTS/Linkage/linkageNumberNotLinkedByFacilityActions';
import { loadNewOnPrep } from '../../actions/HTS/Prep/newOnPrepAction';
import Loading from './../Shared/Loading';
import { useHistory, useParams } from 'react-router-dom';
import { loadPrepDiscontinuation } from '../../actions/HTS/Prep/prepDiscontinuationAction';
import { loadPrepDiscontinuationReason } from '../../actions/HTS/Prep/prepDiscontinuationReasonAction';
import { loadCTPrep } from './../../actions/HTS/Prep/CTPrepAction';
import { loadPrepScreenedTrends } from './../../actions/HTS/Prep/prepScreenedTrendsAction';
import { loadPrepEligibleTrends } from '../../actions/HTS/Prep/prepEligibleTrendsAction';
import { loadPrepEligibleAgegroup } from '../../actions/HTS/Prep/prepEligibleAgegroupAction';
import { loadNewOnPrepTrends } from '../../actions/HTS/Prep/newOnPrepTrendsAction';
import { loadNewOnPrepAgeSex } from '../../actions/HTS/Prep/newOnPrepAgeSexAction';
import { loadPrepDiscontinuationTrends } from '../../actions/HTS/Prep/prepDiscontinuationTrendsAction';
import { loadPrepSTITreatementOutcomes } from './../../actions/HTS/Prep/prepSTITreatmentOutcomesAction';
import { loadCTPrepTrend } from '../../actions/HTS/Prep/CTPrepTrendsAction';
import { loadPrepTotalTested } from '../../actions/HTS/Prep/prepTotalTestedAction';
import { loadCTPrepAgeSexTrend } from '../../actions/HTS/Prep/CTPrepAgeSexTrendsAction';
import { loadPrepMonth1Refill } from '../../actions/HTS/Prep/prepMonth1RefillAction';
import { loadPrepMonth3Refill } from '../../actions/HTS/Prep/prepMonth3RefillAction';
import { loadPrepMonth1RefillAgeSex } from '../../actions/HTS/Prep/prepMonth1RefillAgeSexAction';
import { loadPrepMonth3RefillAgeSex } from './../../actions/HTS/Prep/prepMonth3RefillAgeSexAction';
import { loadPrepTestedMonth1Refill } from '../../actions/HTS/Prep/prepTestedMonth1RefillAction';
import { loadPrepTestedMonth3Refill } from '../../actions/HTS/Prep/prepTestedMonth3RefillAction';
import { loadPrepScreeningOutcome } from '../../actions/HTS/Prep/prepScreeningOutcomeAction';
import { loadPrepDiagnosedSTITrends } from '../../actions/HTS/Prep/prepDiagnosedSTITrendsAction';

const Uptake = Loadable({ loader: () => import('./Uptake/Uptake'), loading: Loading, delay: LOADING_DELAY });
const Linkage = Loadable({ loader: () => import('./Linkage/Linkage'), loading: Loading, delay: LOADING_DELAY });
const PNS = Loadable({ loader: () => import('./PNS/PNS'), loading: Loading, delay: LOADING_DELAY });
const PrEP = Loadable({ loader: () => import('./PrEP/PrEP'), loading: Loading, delay: LOADING_DELAY });

const HTS = () => {
    const dispatch = useDispatch();
    const htsTab = useSelector(state => state.ui.htsTab);
    const noCache = useSelector(state => state.filters.noCache);
    const counties = useSelector(state => state.filters.counties);
    const subCounties = useSelector(state => state.filters.subCounties);
    const facilities = useSelector(state => state.filters.facilities);
    const partners = useSelector(state => state.filters.partners);
    const agencies = useSelector(state => state.filters.agencies);
    const projects = useSelector(state => state.filters.projects);
    const fromDate = useSelector(state => state.filters.fromDate);

    const DEFAULT_ACTIVE_TAB = useSelector((state) => state.ui.htsTab);
    const { active_tab } = useParams();
    const history = useHistory();

    const renderTabNavItems = () => {
        return Object.keys(HTS_TABS).map((value) => {
            return (
                <NavItem key={value}>
                    <NavLink
                        active={active_tab === value}
                        onClick={() => {
                            dispatch(changeHtsTab(value));
                            toggle(value);
                        }}
                    >
                        <div style={{ fontSize: '.78em' }}>
                            {HTS_TABS[value]}
                        </div>
                    </NavLink>
                </NavItem>
            );
        });
    };

    useEffect(() => {
        dispatch(changeCurrentPage(PAGES.hts));
        dispatch(enableFromDateFilter());
        dispatch(enableToDateFilter())
        dispatch(enableAgencyFilter());
        dispatch(disableDatimAgePopulationFilter());
        return () => {
            dispatch(disableFromDateFilter());
        }
    }, [dispatch]);

    useEffect(() => {
        switch (active_tab) {
            case 'linkage':
                dispatch(changeHtsTab(active_tab));
                dispatch(loadLinkageNumberNotLinkedByFacility());
                break;
            case 'prep':
                dispatch(changeHtsTab(active_tab));
                dispatch(loadNewOnPrep());
                dispatch(loadPrepDiscontinuation());
                dispatch(loadPrepDiscontinuationReason());
                dispatch(loadCTPrep());
                dispatch(loadPrepScreenedTrends());
                dispatch(loadPrepEligibleTrends());
                dispatch(loadPrepEligibleAgegroup());
                dispatch(loadNewOnPrepTrends());
                dispatch(loadNewOnPrepAgeSex());
                dispatch(loadPrepDiscontinuationTrends());
                dispatch(loadPrepSTITreatementOutcomes());
                dispatch(loadCTPrepTrend());
                dispatch(loadPrepTotalTested());
                dispatch(loadCTPrepAgeSexTrend());
                dispatch(loadPrepMonth1Refill());
                dispatch(loadPrepMonth3Refill());
                dispatch(loadPrepMonth1RefillAgeSex());
                dispatch(loadPrepMonth3RefillAgeSex());
                dispatch(loadPrepTestedMonth1Refill());
                dispatch(loadPrepTestedMonth3Refill());
                dispatch(loadPrepScreeningOutcome());
                dispatch(loadPrepDiagnosedSTITrends());
                
                break;
            default:
                break;
        }
    }, [
        dispatch,
        counties,
        subCounties,
        facilities,
        partners,
        agencies,
        projects,
        fromDate,
        active_tab,
        noCache,
    ]);

    useEffect(() => {
        if (!active_tab) {
            history.push(`/hiv-testing/${DEFAULT_ACTIVE_TAB}`);
        }
    }, []);

    if(!active_tab){
        history.push(`/hiv-testing/${DEFAULT_ACTIVE_TAB}`);
    }
    const toggle = tab => {
        if (active_tab !== tab) {
            history.push(`/hiv-testing/${tab}`);
        }
    };

    return (
        <div>
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={active_tab}>
                <TabPane tabId="uptake">
                    { active_tab === 'uptake' ? <Uptake/>: null }
                </TabPane>
                <TabPane tabId="linkage">
                    { active_tab === 'linkage' ? <Linkage/>: null }
                </TabPane>
                <TabPane tabId="pns">
                    { active_tab === 'pns' ? <PNS/>: null }
                </TabPane>
                <TabPane tabId="prep">
                    { active_tab === 'prep' ? <PrEP/>: null }
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );
};

export default HTS;
