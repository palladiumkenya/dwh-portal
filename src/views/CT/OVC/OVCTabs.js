import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

const OVCTabs = () => {
    const [activeTab, setActiveTab] = useState('distributionOfOvcClients');

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'distributionOfOvcClients' })} onClick={() => { setActiveTab('distributionOfOvcClients') }}>DISTRIBUTION OF OVC CLIENTS</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'managementOfOvcClients' })} onClick={() => { setActiveTab('managementOfOvcClients') }}>MANAGEMENT OF OVC CLIENTS</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="distributionOfOvcClients">

                </TabPane>

                <TabPane tabId="managementOfOvcClients">

                </TabPane>
            </TabContent>
        </div>
    );
};

export default OVCTabs;
