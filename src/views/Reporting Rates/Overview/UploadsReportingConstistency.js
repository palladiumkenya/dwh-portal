import React, { Component } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

class UploadsReportingConsistency extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <Card className="card-uploads-consistency-rates">
            <CardHeader className="expected-uploads-header">
              EXPECTED UPLOADS
            </CardHeader>
            <CardBody
              className="align-items-center d-flex justify-content-center"
              style={{
                textAlign: "center",
                backgroundColor: "#F6F6F6",
                height: "100px",
              }}
            >
              <div className="col-12">
                <span className="expected-uploads-text">1190</span>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-4">
          <Card className="card-uploads-consistency-rates">
            <CardHeader className="expected-uploads-header">
              OVERALL REPORTING RATES
            </CardHeader>
            <CardBody
              className="align-items-center justify-content-center"
              style={{ backgroundColor: "#F6F6F6", height: "100px" }}
            >
              <div className="col-12" style={{ textAlign: "center" }}>
                <span className="overall-rates-figure">689</span>&nbsp;
                <sup className="overall-rates-sup">60%</sup>
              </div>
              <div className="col-12" style={{ textAlign: "center" }}>
                <span className="overall-rates-text">
                  CARE & TREATMENT MARCH 2020
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-4">
          <Card className="card-uploads-consistency-rates">
            <CardHeader className="expected-uploads-header">
              CONSISTENCY OF REPORTING
            </CardHeader>
            <CardBody
              className="align-items-center justify-content-center"
              style={{ backgroundColor: "#F6F6F6", height: "100px" }}
            >
              <div className="col-12" style={{ textAlign: "center" }}>
                <span className="consistency-reporting-figure">234</span>
                <sup className="consistency-reporting-sup">60%</sup>
              </div>
              <div className="col-12" style={{ textAlign: "center" }}>
                <span className="consistency-reporting-text">
                  CONSISTENCY FOR MARCH 2020
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default UploadsReportingConsistency;
