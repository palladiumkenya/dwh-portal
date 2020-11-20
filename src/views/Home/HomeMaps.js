import React from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import HomeEmrSitesMap from './HomeEmrSitesMap';

const HomeMaps = ({globalFilters, onGlobalFiltersChange}) => {

    const changeHomeTabTo = (tab) => {
        onGlobalFiltersChange({ ...globalFilters, homeTab: tab});
    }

    const renderTabNavItems = () => {
        return (
            Object.keys(globalFilters.homeTabs).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={globalFilters.homeTab === value} onClick={() => { changeHomeTabTo(value); }} >
                            {globalFilters.homeTabs[value]}
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
            <TabContent activeTab={globalFilters.homeTab}>
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
