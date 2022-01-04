import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import Loading from '../../Shared/Loading';
import { LOADING_DELAY } from '../../../constants';

const OVCOverview = Loadable({ loader: () => import('./OVCOverview'), loading: Loading, delay: LOADING_DELAY });
const OVCIndicatorDefinition = Loadable({ loader: () => import('./OVCIndicatorDefinition'), loading: Loading, delay: LOADING_DELAY });

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
                    <OVCOverview />

                    <OVCIndicatorDefinition />

                </TabPane>

                <TabPane tabId="managementOfOvcClients">

                </TabPane>
            </TabContent>
        </div>
    );
};

export default OVCTabs;
