import React, { useState } from "react";
import ReportingRatesByCountyHeader from "./ReportingRatesByCountyHeader";
import Filter from "../../Shared/Filter";
import CountyFooter from "./CountyFooter";
import CountyReports from "./CountyReports";
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

const ReportingRatesByCounty = () => {
    const [globalFilter, setGlobalFilter] = useState({
        dockets: { "CT": "CARE & TREATMENT", "HTS": "HIV TESTING SERVICES", "PKV": "PATIENT KEY VALUES" },
        docket: "CT",
        county: '',
        agency: '',
        partner: '',
        period:`${new Date().getFullYear()},${new Date().getMonth()}`
    });

    const updateGlobalFilter = (selection) => {
        setGlobalFilter(selection);
    };

    const changeDocketTo = (tab) => {
        let params = { ...globalFilter };
        params.docket = tab;
        setGlobalFilter(params);
    };

    const renderTabNavItems = () => {
        return (
            Object.keys(globalFilter.dockets).map((value) => {
                return (
                    <NavItem key={value}>
                        <NavLink active={globalFilter.docket === value} onClick={() => { changeDocketTo(value); }} >
                            {globalFilter.dockets[value]}
                        </NavLink>
                    </NavItem>
                )
            })
        );
    };

    const renderTabContent = () => {
        return (
            <TabPane tabId={globalFilter.docket}>
                <CountyReports globalFilter={globalFilter}></CountyReports>
            </TabPane>
        );
    };

    return (
        <div>
            <ReportingRatesByCountyHeader period={globalFilter?.period}></ReportingRatesByCountyHeader>

            <Filter onFilterChange={updateGlobalFilter}></Filter>

            <Nav tabs>
                { renderTabNavItems() }
            </Nav>

            <TabContent activeTab={globalFilter.docket}>
                { renderTabContent() }
            </TabContent>

            <hr />
            <CountyFooter></CountyFooter>
            <hr />
        </div>
    );
};

export default ReportingRatesByCounty;
