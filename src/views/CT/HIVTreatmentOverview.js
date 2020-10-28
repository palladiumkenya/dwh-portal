import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import NewOnArt from './NewOnArt/NewOnArt';
import CurrentOnART from './CurrentOnART/CurrentOnART';
import DSD from './DSD/DSD';
import TreatmentOutcomes from './TreatmentOutcomes/TreatmentOutcomes';
import VL from './VL/VL';
import TBHIV from './TBHIV/TBHIV';

const HIVTreatmentOverview = () => {

    const [globalFilter, setGlobalFilter] = useState({
        ctTabs: {
            "txNew": "NEWLY STARTED ON ART",
            "txCurr": "CURRENT ON ART",
            "txOpt": "ART OPTIMIZATION",
            "tbHiv": "TB/HIV",
            "advEv": "ADVERSE EVENTS",
            "dsd": "DSD",
            "vl": "VL MONITORING",
            "tOut": "TREATMENT OUTCOMES"
        },
        ctTab: "txNew",
        county: '',
        subCounty: '',
        facility: '',
        partner: '',
        period: `${new Date().getFullYear()},${new Date().getMonth()}`
    });

    const changeCtTabTo = (tab) => {
        let params = { ...globalFilter };
        params.ctTab = tab;
        setGlobalFilter(params);
    }

    const renderTabNavItems = () => {
        return (
            Object.keys(globalFilter.ctTabs).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={globalFilter.ctTab === value} onClick={() => { changeCtTabTo(value); }} >
                            {globalFilter.ctTabs[value]}
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
            <TabContent activeTab={globalFilter.ctTab}>
                <TabPane tabId="txNew">
                    <NewOnArt globalFilter={globalFilter}></NewOnArt>
                </TabPane>
                <TabPane tabId="txCurr">
                    <CurrentOnART />
                </TabPane>
                <TabPane tabId="dsd">
                    <DSD />
                </TabPane>
                <TabPane tabId="tOut">
                    <TreatmentOutcomes />
                </TabPane>
                <TabPane tabId="vl">
                    <VL />
                </TabPane>
                <TabPane tabId="tbHiv">
                    <TBHIV />
                </TabPane>
            </TabContent>
            <p></p>
        </div>
    );
};

export default HIVTreatmentOverview;
