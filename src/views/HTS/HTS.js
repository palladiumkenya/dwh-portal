import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import HtsUptake from './HtsUptake/HtsUptake';
import HtsLinkage from './HtsLinkage/HtsLinkage';
import PNS from './PNS/PNS';

const HTS = ({globalFilters, onGlobalFiltersChange}) => {

    const changeHtsTabTo = (tab) => {
        onGlobalFiltersChange({ ...globalFilters, htsTab: tab});
    }

    const renderTabNavItems = () => {
        return (
            Object.keys(globalFilters.htsTabs).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={globalFilters.htsTab === value} onClick={() => { changeHtsTabTo(value); }} >
                            {globalFilters.htsTabs[value]}
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
            <TabContent activeTab={globalFilters.htsTab}>
                <TabPane tabId="uptake">
                    <HtsUptake globalFilters={globalFilters}  onGlobalFiltersChange={onGlobalFiltersChange}></HtsUptake>
                </TabPane>
                <TabPane tabId="linkage">
                    <HtsLinkage globalFilters={globalFilters}  onGlobalFiltersChange={onGlobalFiltersChange}></HtsLinkage>
                </TabPane>
                <TabPane tabId="pns">
                    <PNS globalFilters={globalFilters}  onGlobalFiltersChange={onGlobalFiltersChange}></PNS>
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );
};

export default HTS;
