import React, { useState } from "react";
import ServiceDeliveryPartnerHeader from "./ServiceDeliveryPartnerHeader";
import Filter from "../../Shared/Filter";
import ServiceDeliveryPartnerFooter from "./ServiceDeliveryPartnerFooter";
import ServiceDeliveryPartnerReports from "./ServiceDeliveryPartnerReports";
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import CountyReports from '../County/CountyReports';

const ReportingRatesByServiceDeliveryPartner = () => {
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
                <ServiceDeliveryPartnerReports globalFilter={globalFilter}></ServiceDeliveryPartnerReports>
            </TabPane>
        );
    };

    return (
        <div>
            <ServiceDeliveryPartnerHeader period={globalFilter?.period}></ServiceDeliveryPartnerHeader>

            <Filter onFilterChange={updateGlobalFilter}></Filter>

            <Nav tabs>
                { renderTabNavItems() }
            </Nav>

            <TabContent activeTab={globalFilter.docket}>
                { renderTabContent() }
            </TabContent>

            <hr />
            <ServiceDeliveryPartnerFooter></ServiceDeliveryPartnerFooter>
            <hr />
        </div>
    );
};

export default ReportingRatesByServiceDeliveryPartner;
