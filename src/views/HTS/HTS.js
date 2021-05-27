import React, { useEffect } from 'react';
import Loadable from 'react-loadable';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { HTS_TABS, PAGES, LOADING_DELAY } from './../../constants';
import { changeHtsTab, changeCurrentPage } from './../../actions/Shared/uiActions';
import { enableFromDateFilter, disableFromDateFilter } from './../../actions/Shared/filterActions';
import Loading from './../Shared/Loading';

const Uptake = Loadable({ loader: () => import('./Uptake/Uptake'), loading: Loading, delay: LOADING_DELAY });
const Linkage = Loadable({ loader: () => import('./Linkage/Linkage'), loading: Loading, delay: LOADING_DELAY });
const PNS = Loadable({ loader: () => import('./PNS/PNS'), loading: Loading, delay: LOADING_DELAY });

const HTS = () => {
    const dispatch = useDispatch();
    const htsTab = useSelector(state => state.ui.htsTab);

    const renderTabNavItems = () => {
        return (
            Object.keys(HTS_TABS).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={htsTab === value} onClick={() => { dispatch(changeHtsTab(value)); }} >
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
        return () => {
            dispatch(disableFromDateFilter());
        }
    }, [dispatch]);

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
