import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";

class ReportingRatesOverviewHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card className="pageHeading_reporting">
        <CardBody>
          <div className="row">
            <div className="col-5">
              <div className="row">
                <div className="col-6">
                  <div className="reporting-rates-card-title">
                    REPORTING RATES
                  </div>
                </div>
                <div className="col-1">
                  <div className="reporting-rates-card-separator"></div>
                </div>
                <div className="col-5">
                  <div className="reporting-rates-card-overview">OVERVIEW</div>
                </div>
              </div>
            </div>
            <div className="col-7">
              <div className="reporting-rates-card-year">Year 2020</div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default ReportingRatesOverviewHeader;
