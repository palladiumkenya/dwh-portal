import React, {Component} from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const options = {
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
            'NAIROBI',
            'SIAYA',
            'KISUMU',
            'HOMA BAY',
            'KAKAMEGA',
            'KIAMBU',
            'MIGORI',
            'MOMBASA',
            'KITUI',
            'MACHAKOS',
            'MERU',
            'NYERI',
            'MAKUENI',
            'KISII',
            'MURANG\'A',
            'BUNGOMA',
            'BUSIA',
            'NYAMIRA',
            'UASIN GISHU',
            'NAKURU',
            'EMBU',
            'KILIFI',
            'BOMET',
            'KAJIADO',
            'NANDI'
        ],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of Facilities by county',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        data: [
            247,
            245,
            237,
            235,
            233,
            230,
            228,
            227,
            226,
            223,
            220,
            219,
            218,
            217,
            214,
            213,
            210,
            210,
            210,
            208,
            208,
            207,
            205,
            204,
            203
        ],
        color: "#2F4050;"
    }]
};

const options2 = {
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
            'NAIROBI',
            'SIAYA',
            'KISUMU',
            'HOMA BAY',
            'KAKAMEGA',
            'KIAMBU',
            'MIGORI',
            'MOMBASA',
            'KITUI',
            'MACHAKOS',
            'MERU',
            'NYERI',
            'MAKUENI',
            'KISII',
            'MURANG\'A',
            'BUNGOMA',
            'BUSIA',
            'NYAMIRA',
            'UASIN GISHU',
            'NAKURU',
            'EMBU',
            'KILIFI',
            'BOMET',
            'KAJIADO',
            'NANDI'
        ],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percentage (%) of uploads by county',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        data: [
            247,
            245,
            237,
            235,
            233,
            230,
            228,
            227,
            226,
            223,
            220,
            219,
            218,
            217,
            214,
            213,
            210,
            210,
            210,
            208,
            208,
            207,
            205,
            204,
            203
        ],
        color: "#59A14F"
    }]
};

const options3 = {
    chart: {
        type: 'bar'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
            'NAIROBI',
            'SIAYA',
            'KISUMU',
            'HOMA BAY',
            'KAKAMEGA',
            'KIAMBU',
            'MIGORI',
            'MOMBASA',
            'KITUI',
            'MACHAKOS',
            'MERU',
            'NYERI',
            'MAKUENI',
            'KISII',
            'MURANG\'A',
            'BUNGOMA',
            'BUSIA',
            'NYAMIRA',
            'UASIN GISHU',
            'NAKURU',
            'EMBU',
            'KILIFI',
            'BOMET',
            'KAJIADO',
            'NANDI'
        ],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Reporting Rate',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        data: [
            247,
            245,
            237,
            235,
            233,
            230,
            228,
            227,
            226,
            223,
            220,
            219,
            218,
            217,
            214,
            213,
            210,
            210,
            210,
            208,
            208,
            207,
            205,
            204,
            203
        ],
        color: "#F28E2B"
    }]
};

class CountyReports extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            Distribution of EMR sites by County
                        </CardHeader>
                        <CardBody className="trends-body">
                            <div className="col-12">
                                <HighchartsReact highcharts={Highcharts} options={options} />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            Overall Reporting - Care & Treatment by County March 2020
                        </CardHeader>
                        <CardBody className="trends-body">
                            <div className="col-12">
                                <HighchartsReact highcharts={Highcharts} options={options2} />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            Overall Reporting - PKVs by County March 2020
                        </CardHeader>
                        <CardBody className="trends-body">
                            <div className="col-12">
                                <HighchartsReact highcharts={Highcharts} options={options3} />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default CountyReports;
