import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  chart: {
    type: "column",
  },
  title: {
    text: "",
    style: {
      display: "none",
    },
  },
  xAxis: {
    categories: ["January", "February", "March", "April", "May", "June"],
    title: {
      text: null,
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: "",
      align: "high",
    },
    labels: {
      overflow: "justify",
    },
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true,
      },
    },
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: true,
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            enabled: false,
          },
        },
      },
    ],
  },
  series: [
    {
      data: [107, 31, 635, 203, 2, 500],
      color: "#1AB394",
    },
  ],
};

const options2 = {
  chart: {
    type: "column",
  },
  title: {
    text: "",
    style: {
      display: "none",
    },
  },
  xAxis: {
    categories: ["January", "February", "March", "April", "May", "June"],
    title: {
      text: null,
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: "",
      align: "high",
    },
    labels: {
      overflow: "justify",
    },
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true,
      },
    },
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: true,
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            enabled: false,
          },
        },
      },
    ],
  },
  series: [
    {
      data: [107, 31, 635, 203, 2, 500],
      color: "#2F4050",
    },
  ],
};

class ReportingRatesTrends extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <Card className="trends-card">
            <CardHeader className="trends-header">
              <span className="trends-text">
                TRENDS IN REPORTING CARE & TREATMENT (OVERALL)
              </span>
            </CardHeader>
            <CardBody className="trends-body">
              <div className="col-12">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-6">
          <Card className="trends-card">
            <CardHeader className="trends-header">
              <span className="trends-text">
                TRENDS IN REPORTING CARE & TREATMENT (CONSISTENCY)
              </span>
            </CardHeader>
            <CardBody className="trends-body">
              <HighchartsReact highcharts={Highcharts} options={options2} />
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default ReportingRatesTrends;
