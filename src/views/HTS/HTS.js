import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Uptake from './Uptake/Uptake';
import Linkage from './Linkage/Linkage';
import PNS from './PNS/PNS';
import { HTS_TABS } from "../../constants";
import { changeHtsTab } from "../../actions/uiActions";

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
