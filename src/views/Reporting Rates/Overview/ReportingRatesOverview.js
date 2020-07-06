import React, { useState } from 'react';
import Filter from '../../Shared/Filter';
import ReportingRatesOverviewHeader from './ReportingRatesOverviewHeader';
import UploadsReportingConsistency from './UploadsReportingConstistency';
import ReportingRatesTrends from './ReportingRatesTrends';
import ReportingRatesOverviewFooter from './ReportingRatesOverviewFooter';
import { Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';

const ReportingRatesOverview = () => {
  
  const [globalFilter, setGlobalFilter] = useState({
    dockets: { "CT": "CARE & TREATMENT", "HTS": "HIV TESTING SERVICES", "PKV": "PATIENT KEY VALUES" },
    docket: "CT",
    county: '',
    agency: '',
    partner: '',
    period: `${new Date().getFullYear()},${new Date().getMonth()}`
  });
  
  const updateGlobalFilter = (selection) => {
    setGlobalFilter(selection);
  };
  
  const changeDocketTo = (tab) => {
    let params = { ...globalFilter };
    params.docket = tab;
    setGlobalFilter(params);
  }

  const renderTabNavItems = () => {
    return (
      Object.keys(globalFilter.dockets).map((value) => {
        return (
          <NavItem>
            <NavLink active={globalFilter.docket === value} onClick={() => { changeDocketTo(value); }} >
              {globalFilter.dockets[value]}
            </NavLink>
          </NavItem>
        );
      })
    );
  }

  const renderTabContent = () => {
    return (
      <TabPane tabId={globalFilter.docket}>
        <UploadsReportingConsistency globalFilter={globalFilter}></UploadsReportingConsistency>
        <ReportingRatesTrends globalFilter={globalFilter}></ReportingRatesTrends>
      </TabPane>
    );
  }

  return (
    <div>
      <ReportingRatesOverviewHeader period={globalFilter?.period}></ReportingRatesOverviewHeader>
      <Filter onFilterChange={updateGlobalFilter}></Filter>
      <Nav tabs>
        {renderTabNavItems()}
      </Nav>
      <TabContent activeTab={globalFilter.docket}>
        {renderTabContent()}
      </TabContent>
      <hr/>
      <ReportingRatesOverviewFooter></ReportingRatesOverviewFooter>
      <hr/>
    </div>
  );
};

export default ReportingRatesOverview;
