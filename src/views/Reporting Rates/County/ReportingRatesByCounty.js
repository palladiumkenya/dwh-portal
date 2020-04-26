import React, { Component } from "react";
import ReportingRatesByCountyHeader from "./ReportingRatesByCountyHeader";
import Filter from "../../Shared/Filter";
import CountyFooter from "./CountyFooter";
import CountyReports from "./CountyReports";

class ReportingRatesByCounty extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ReportingRatesByCountyHeader></ReportingRatesByCountyHeader>

                <Filter></Filter>

                <CountyReports></CountyReports>

                <hr />
                <CountyFooter></CountyFooter>
                <hr />
            </div>
        );
    }
}
export default ReportingRatesByCounty;
