import React, { useState } from "react";
import ReportingRatesByCountyHeader from "./ReportingRatesByCountyHeader";
import Filter from "../../Shared/Filter";
import CountyFooter from "./CountyFooter";
import CountyReports from "./CountyReports";

const ReportingRatesByCounty = () => {
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
            <ReportingRatesByCountyHeader period={globalFilter?.period}></ReportingRatesByCountyHeader>

            <Filter onFilterChange={updateGlobalFilter}></Filter>

            <CountyReports globalFilter={globalFilter}></CountyReports>

            <hr />
            <CountyFooter></CountyFooter>
            <hr />
        </div>
    );
};

export default ReportingRatesByCounty;
