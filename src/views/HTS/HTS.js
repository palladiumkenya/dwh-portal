import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { HTS_TABS, PAGES, LOADING_DELAY } from './../../constants';
import { changeHtsTab, changeCurrentPage } from './../../actions/Shared/uiActions';
import { enableFromDateFilter, disableFromDateFilter, enableAgencyFilter } from './../../actions/Shared/filterActions';
import { loadLinkageNumberNotLinkedByFacility } from '../../actions/HTS/Linkage/linkageNumberNotLinkedByFacilityActions';
import Loading from './../Shared/Loading';
import { Route, useHistory, useParams } from 'react-router-dom';
import { Page404 } from '../Pages';

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
                        <NavLink active={htsTab === value} onClick={() => {
                            dispatch(changeHtsTab(value));
                            toggle(value);
                        }} replace >
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
    let urls = [
        {
            id: 'uptake',
            url: 'hts-uptake'
        },
        {
            id: 'linkage',
            url: 'hts-linkage'
        },
        {
            id: 'pns',
            url: 'partner-notification-service'
        }
    ]

    const DEFAULT_ACTIVE_TAB = htsTab;
    let { active_tab } = useParams();
    const history = useHistory();
    useEffect(() => {
        if (!active_tab) {
            let tab = urls.filter(t => t.id === DEFAULT_ACTIVE_TAB)[0]
            if (tab) history.push(`/hiv-testing/${tab.url}`);
            else return <Route path="*" component={Page404} status={404}/>
        }
    }, []);

    if (!urls.filter(t => t.url === active_tab)[0]) return <Route path="*" component={Page404} status={404}/>

    if (active_tab) {
        active_tab = urls.filter(t => t.url === active_tab)[0].id
    }

    if(!active_tab){
        let tab = urls.filter(t => t.id === htsTab)[0].url
        history.push(`/hiv-testing/${tab}`);
    }
    const toggle = tab => {
        if (active_tab !== tab) {
            let t = urls.filter(t => t.id === tab)[0].url
            history.push(`/hiv-testing/${t}`);
        }
    };

    return (
        <div>
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={htsTab}>
                <TabPane tabId="uptake">
                    { htsTab === 'uptake' ? <Uptake/>: null }
                </TabPane>
                <TabPane tabId="linkage">
                    { htsTab === 'linkage' ? <Linkage/>: null }
                </TabPane>
                <TabPane tabId="pns">
                    { htsTab === 'pns' ? <PNS/>: null }
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );
};

export default HTS;
