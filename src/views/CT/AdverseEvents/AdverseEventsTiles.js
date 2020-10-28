import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AdverseEventsTiles = ({ globalFilter }) => {
    const [adults15PlusCurrentOnART, setAdults15PlusCurrentOnART] = useState({});
    const [under15AdverseEventsDesegregation, setUnder15AdverseEventsDesegregation] = useState({});
    const [adults15PlusAdverseEventsDesegregation, setAdults15PlusAdverseEventsDesegregation] = useState({});


    useEffect(() => {
        loadUnder15AdverseEventsDesegregation();
        loadAdults15PlusAdverseEventsDesegregation();
    }, [globalFilter]);

    const loadUnder15AdverseEventsDesegregation =  async () => {
        setUnder15AdverseEventsDesegregation({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['0 - 11 Months', '1 - 5 Yrs', '5 - 9 Yrs', '10 - 14 Yrs']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENT OF PATIENTS'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Male',
                color: "#1AB394",
                data: [5, 3, 4, 7]
            }, {
                name: 'Female',
                color: "#485969",
                data: [2, 2, 3, 2]
            }]
        });
    };

    const loadAdults15PlusAdverseEventsDesegregation =  async () => {
        setAdults15PlusAdverseEventsDesegregation({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['15 - 24 Yrs', '25 - 34 Yrs', '35 - 44 Yrs', '45 - 54 Yrs', '55 - 64 Yrs', '>=65 Yrs']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENT OF PATIENTS'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Male',
                color: "#1AB394",
                data: [5, 3, 4, 7, 2, 2]
            }, {
                name: 'Female',
                color: "#485969",
                data: [2, 2, 3, 2, 2, 2]
            }]
        });
    };

    return (
        <span>
            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS 15+ CURRENT ON ART
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">730,655</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            ADULTS 15+ ON ART AND DEVELOPED AEs
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">3,071</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            NUMBER OF AEs REPORTED CASES IN ADULTS 15+
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">5,477</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CHILDREN CURRENT ON ART
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">730,655</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            CHILDREN ON ART AND DEVELOPED AEs
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">3,071</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="card-uploads-consistency-rates">
                        <CardHeader className="expected-uploads-header">
                            NUMBER OF AEs REPORTED CASES IN CHILDREN
                        </CardHeader>
                        <CardBody
                            className="align-items-center d-flex justify-content-center"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#F6F6F6',
                                height: '100px'
                            }}
                        >
                            <div className="col-12">
                                <span className="expected-uploads-text">5,477</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            CHILDREN &#60;15 ON ART AND DEVELOPED ADVERSE EVENTS(N=495)
                        </CardHeader>
                        <CardBody className="trends-body">
                            <div className="col-12">
                                <HighchartsReact highcharts={Highcharts} options={under15AdverseEventsDesegregation} />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-6">
                    <Card className="trends-card">
                        <CardHeader className="trends-header">
                            ADULTS 15+ ON ART AND DEVELOPED ADVERSE EVENTS(N=495)
                        </CardHeader>
                        <CardBody className="trends-body">
                            <div className="col-12">
                                <HighchartsReact highcharts={Highcharts} options={adults15PlusAdverseEventsDesegregation} />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </span>
    );
};

export default AdverseEventsTiles;
