import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

const COVIDTabs = () => {
    const [activeTab, setActiveTab] = useState('vaccination');

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'vaccination' })} onClick={() => { setActiveTab('vaccination') }}>VACCINATION</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'infection&Outcomes' })} onClick={() => { setActiveTab('infection&Outcomes') }}>INFECTIONS & OUTCOMES</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="vaccination">

                </TabPane>

                <TabPane tabId="infection&Outcomes">

                </TabPane>
            </TabContent>
        </div>
    );
};

export default COVIDTabs;
