import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import HomeEmrSitesMap from './HomeEmrSitesMap';
import HomeCurrentOnArtByCountyMap from './HomeCurrentOnArtByCountyMap';
import { changeHomeTab } from "../../actions/uiActions";
import { HOME_TABS } from "../../constants";

const HomeMaps = () => {
    const homeTab = useSelector(state => state.ui.homeTab);
    const dispatch = useDispatch();

    const renderTabNavItems = () => {
        return (
            Object.keys(HOME_TABS).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={homeTab === value} onClick={() => { dispatch(changeHomeTab(value)); }} >
                            {HOME_TABS[value]}
                        </NavLink>
                    </NavItem>
                );
            })
        );
    };

    return (
        <>
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={homeTab}>
                <TabPane tabId="emr">
                    <HomeEmrSitesMap/>
                </TabPane>
                <TabPane tabId="txCurr">
                    <HomeCurrentOnArtByCountyMap/>
                </TabPane>
                <TabPane tabId="hasCurrVl">
                    
                </TabPane>
                <TabPane tabId="suppressed">
                    
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </>
    );
};

export default HomeMaps;
