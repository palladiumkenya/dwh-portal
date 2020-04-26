import React, { Component } from "react";
import Filter from "../../Shared/Filter";
import ReportingRatesOverviewHeader from "./ReportingRatesOverviewHeader";
import UploadsReportingConsistency from "./UploadsReportingConstistency";
import ReportingRatesTrends from "./ReportingRatesTrends";
import ReportingRatesOverviewFooter from "./ReportingRatesOverviewFooter";

class ReportingRatesOverview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ReportingRatesOverviewHeader></ReportingRatesOverviewHeader>

        <Filter></Filter>

        <UploadsReportingConsistency></UploadsReportingConsistency>

        <ReportingRatesTrends></ReportingRatesTrends>

        <hr />
        <ReportingRatesOverviewFooter></ReportingRatesOverviewFooter>
        <hr />
      </div>
    );
  }
}
export default ReportingRatesOverview;
