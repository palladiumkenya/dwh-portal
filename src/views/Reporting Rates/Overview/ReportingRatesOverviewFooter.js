import React, { Component } from "react";

class ReportingRatesOverviewFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <span className="reporting-rates-overview-text">
                The Overall reporting rates refers to the proportion of EMR
                sites that submitted the most recent i.e. The Jan 2020 Overall
                reporting rates in the number of EMR sites that uploaded data to
                the NDW in Jan 2020 and so forth.
              </span>
            </div>
            <div className="col-6">
              <div className="reporting-rates-overview-copyright">
                &copy; 2020 Palladium Group
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportingRatesOverviewFooter;
