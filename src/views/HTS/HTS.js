import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Uptake from './Uptake/Uptake';
import Linkage from './Linkage/Linkage';
import PNS from './PNS/PNS';
import { HTS_TABS, PAGES } from "../../constants";
import { changeHtsTab, changeCurrentPage } from "../../actions/Shared/uiActions";
import { enableFromDateFilter, disableFromDateFilter } from "../../actions/Shared/filterActions";

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
                    <Uptake/>
                </TabPane>
                <TabPane tabId="linkage">
                    <Linkage/>
                </TabPane>
                <TabPane tabId="pns">
                    <PNS></PNS>
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );
};

export default HTS;
