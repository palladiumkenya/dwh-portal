import React from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import NewOnArt from './NewOnArt/NewOnArt';
import CurrentOnART from './CurrentOnART/CurrentOnART';
import DSD from './DSD/DSD';
import TreatmentOutcomes from './TreatmentOutcomes/TreatmentOutcomes';
import VL from './VL/VL';
import AdverseEvents from './AdverseEvents/AdverseEvents';
import TBHIV from './TBHIV/TBHIV';
import ARVOptimization from './ARVOptimization/ARVOptimization';

const CT = ({globalFilters, onGlobalFiltersChange}) => {

    const changeCtTabTo = (tab) => {
        onGlobalFiltersChange({ ...globalFilters, ctTab: tab});
    }

    const renderTabNavItems = () => {
        return (
            Object.keys(globalFilters.ctTabs).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={globalFilters.ctTab === value} onClick={() => { changeCtTabTo(value); }} >
                            {globalFilters.ctTabs[value]}
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
            <TabContent activeTab={globalFilters.ctTab}>
                <TabPane tabId="txNew">
                    <NewOnArt globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
                </TabPane>
                <TabPane tabId="txCurr">
                    <CurrentOnART globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
                </TabPane>
                <TabPane tabId="tbHiv">
                    <TBHIV globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
                </TabPane>
                <TabPane tabId="advEv">
                    <AdverseEvents globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
                </TabPane>
                <TabPane tabId="dsd">
                    <DSD globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
                </TabPane>
                <TabPane tabId="tOut">
                    <TreatmentOutcomes globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
                </TabPane>
                <TabPane tabId="vl">
                    <VL globalFilters={globalFilters} onGlobalFiltersChange={onGlobalFiltersChange}/>
                </TabPane>
                <TabPane tabId="txOpt">
                    <ARVOptimization/>
                </TabPane>
            </TabContent>
            <p></p>
        </div>
    );
};

export default CT;
