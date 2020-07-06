import React, { useState } from "react";
import ServiceDeliveryPartnerHeader from "./ServiceDeliveryPartnerHeader";
import Filter from "../../Shared/Filter";
import ServiceDeliveryPartnerFooter from "./ServiceDeliveryPartnerFooter";
import ServiceDeliveryPartnerReports from "./ServiceDeliveryPartnerReports";

const ReportingRatesByServiceDeliveryPartner = () => {
    const [globalFilter, setGlobalFilter] = useState({
        county: '',
        agency: '',
        partner: '',
        period:`${new Date().getFullYear()},${new Date().getMonth()}`
    });

    const updateGlobalFilter = (selection) => {
        setGlobalFilter(selection);
    };

    return (
        <div>
            <ServiceDeliveryPartnerHeader period={globalFilter?.period}></ServiceDeliveryPartnerHeader>

            <Filter onFilterChange={updateGlobalFilter}></Filter>

            <ServiceDeliveryPartnerReports globalFilter={globalFilter}></ServiceDeliveryPartnerReports>

            <hr />
            <ServiceDeliveryPartnerFooter></ServiceDeliveryPartnerFooter>
            <hr />
        </div>
    );
};

export default ReportingRatesByServiceDeliveryPartner;
