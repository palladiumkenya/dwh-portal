import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import HtsUptake from './HtsUptake/HtsUptake';
import HtsLinkage from './HtsLinkage/HtsLinkage';

const HTS = () => {

    const [tabInfo, setTabInfo] = useState({
        htsTabs: {
            "uptake": "HIV TESTING SERVICES UPTAKE",
            "linkage": "HIV TESTING SERVICES LINKAGE",
            "pns": "PARTNER NOTIFICATION SERVICES",
        },
        htsTab: "uptake"
    });

    const changeHtsTabTo = (tab) => {
        let params = { ...tabInfo };
        params.htsTab = tab;
        setTabInfo(params);
    }

    const renderTabNavItems = () => {
        return (
            Object.keys(tabInfo.htsTabs).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={tabInfo.htsTab === value} onClick={() => { changeHtsTabTo(value); }} >
                            {tabInfo.htsTabs[value]}
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
            <TabContent activeTab={tabInfo.htsTab}>
                <TabPane tabId="uptake">
                    <HtsUptake></HtsUptake>
                </TabPane>
                <TabPane tabId="linkage">
                    <HtsLinkage></HtsLinkage>
                </TabPane>
            </TabContent>
            <p></p><p></p>
        </div>
    );
};

export default HTS;
