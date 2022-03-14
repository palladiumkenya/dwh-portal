import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { HTS_TABS, PAGES, LOADING_DELAY } from './../../constants';
import { changeHtsTab, changeCurrentPage } from './../../actions/Shared/uiActions';
import { enableFromDateFilter, disableFromDateFilter, enableAgencyFilter } from './../../actions/Shared/filterActions';
import { loadLinkageNumberNotLinkedByFacility } from '../../actions/HTS/Linkage/linkageNumberNotLinkedByFacilityActions';
import Loading from './../Shared/Loading';
import { useHistory, useParams } from 'react-router-dom';

const Uptake = Loadable({ loader: () => import('./Uptake/Uptake'), loading: Loading, delay: LOADING_DELAY });
const Linkage = Loadable({ loader: () => import('./Linkage/Linkage'), loading: Loading, delay: LOADING_DELAY });
const PNS = Loadable({ loader: () => import('./PNS/PNS'), loading: Loading, delay: LOADING_DELAY });

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

    const renderTabNavItems = () => {
        return (
            Object.keys(HTS_TABS).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={active_tab === value} onClick={() => {
                            dispatch(changeHtsTab(value));
                            toggle(value);
                        }} >
                            {HTS_TABS[value]}
                        </NavLink>
                    </NavItem>
                );
            })
        );
    };

    useEffect(() => {
        dispatch(changeCurrentPage(PAGES.hts));
        dispatch(enableFromDateFilter());
        dispatch(enableAgencyFilter());
        return () => {
            dispatch(disableFromDateFilter());
        }
    }, [dispatch]);

    useEffect(() => {
        switch (htsTab) {
            case 'linkage':
                dispatch(loadLinkageNumberNotLinkedByFacility());
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
        htsTab,
        noCache
    ]);

    const DEFAULT_ACTIVE_TAB = useSelector(state => state.ui.htsTab);
    const { active_tab } = useParams();
    const history = useHistory();
    useEffect(() => {
        if (!active_tab) {
            history.push(`/hiv-testing/${DEFAULT_ACTIVE_TAB}`);
        }
    }, []);

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
            </TabContent>
            <p></p><p></p>
        </div>
    );
};

export default HTS;
