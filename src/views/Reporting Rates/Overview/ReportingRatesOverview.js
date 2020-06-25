import React, { useState } from 'react';
import Filter from '../../Shared/Filter';
import ReportingRatesOverviewHeader from './ReportingRatesOverviewHeader';
import UploadsReportingConsistency from './UploadsReportingConstistency';
import ReportingRatesTrends from './ReportingRatesTrends';
import ReportingRatesOverviewFooter from './ReportingRatesOverviewFooter';

const ReportingRatesOverview = () => {

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
            <ReportingRatesOverviewHeader period={globalFilter?.period}></ReportingRatesOverviewHeader>

            <Filter onFilterChange={updateGlobalFilter}></Filter>

            <UploadsReportingConsistency globalFilter={globalFilter}></UploadsReportingConsistency>

            <ReportingRatesTrends globalFilter={globalFilter}></ReportingRatesTrends>

            <hr/>
            <ReportingRatesOverviewFooter></ReportingRatesOverviewFooter>
            <hr/>
        </div>
    );

};
export default ReportingRatesOverview;
