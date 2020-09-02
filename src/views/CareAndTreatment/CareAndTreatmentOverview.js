import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import NewOnArt from './NewOnArt/NewOnArt';

const CareAndTreatmentOverview = () => {

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

    const updateGlobalFilter = (selection) => {
        setGlobalFilter(selection);
    };

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
            </TabContent>
        </div>
    );
};

export default CareAndTreatmentOverview;
