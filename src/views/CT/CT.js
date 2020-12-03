import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import NewOnArt from './NewOnArt/NewOnArt';
import CurrentOnART from './CurrentOnART/CurrentOnART';
import DSD from './DSD/DSD';
import TreatmentOutcomes from './TreatmentOutcomes/TreatmentOutcomes';
import VL from './VL/VL';
import AdverseEvents from './AdverseEvents/AdverseEvents';
import TBHIV from './TBHIV/TBHIV';
import ARVOptimization from './ARVOptimization/ARVOptimization';
import { changeCtTab, changeCurrentPage, enableFromDateFilter, disableFromDateFilter } from "../../actions/uiActions";
import { CT_TABS, PAGES } from "../../constants";

const CT = () => {
    const dispatch = useDispatch();
    const ctTab = useSelector(state => state.ui.ctTab);
    const [currentTab, setCurrentTab] = useState();
    const renderTabNavItems = () => {
        return (
            Object.keys(CT_TABS).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={ctTab === value} onClick={() => {
                                dispatch(changeCtTab(value));
                                setCurrentTab(value);
                                if (value == 'txNew') {
                                    dispatch(enableFromDateFilter());
                                } else {
                                    dispatch(disableFromDateFilter());
                                }
                            }} >
                            {CT_TABS[value]}
                        </NavLink>
                    </NavItem>
                );
            })
        );
    };

    useEffect(() => {
        dispatch(changeCurrentPage(PAGES.ct));
        if (ctTab !== 'txNew') {
            dispatch(disableFromDateFilter());
        }
        return () => {
            // dispatch(enableFromDateFilter());
        }
    }, [dispatch]);

    return (
        <div>
            <Nav tabs>
                {renderTabNavItems()}
            </Nav>
            <TabContent activeTab={ctTab}>
                <TabPane tabId="txNew">
                    <NewOnArt/>
                </TabPane>
                <TabPane tabId="txCurr">
                    <CurrentOnART/>
                </TabPane>
                <TabPane tabId="tbHiv">
                    <TBHIV/>
                </TabPane>
                <TabPane tabId="advEv">
                    <AdverseEvents/>
                </TabPane>
                <TabPane tabId="dsd">
                    <DSD/>
                </TabPane>
                <TabPane tabId="tOut">
                    <TreatmentOutcomes/>
                </TabPane>
                <TabPane tabId="vl">
                    <VL/>
                </TabPane>
                <TabPane tabId="txOpt">
                    {currentTab==="txOpt" && <ARVOptimization/>}
                </TabPane>
            </TabContent>
            <p></p>
        </div>
    );
};

export default CT;
