import React from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import HomeEmrSitesMap from './HomeEmrSitesMap';
import * as tabActions from "../../store/actions/tabActions";
import * as appConstants from "../../constants";

const HomeMaps = () => {
    const tabInfo = useSelector(state => state.tabs);
    console.log(tabInfo);
    const renderTabNavItems = () => {
        return (
            Object.keys(appConstants.HOME_TABS).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={tabInfo.homeTab === value} onClick={() => { tabActions.changeHomeTab(value); }} >
                            {appConstants.HOME_TABS[value]}
                        </NavLink>
                    </NavItem>
                );
            })
        );
    };

    return (
        <div>
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={tabInfo.homeTab}>
                <TabPane tabId="emr">
                    <HomeEmrSitesMap/>
                </TabPane>
                <TabPane tabId="txCurr">
                    
                </TabPane>
                <TabPane tabId="hasCurrVl">
                    
                </TabPane>
                <TabPane tabId="suppressed">
                    
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );
};

export default HomeMaps;
