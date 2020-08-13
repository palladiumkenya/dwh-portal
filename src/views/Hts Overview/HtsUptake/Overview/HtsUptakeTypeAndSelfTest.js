import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HtsUptakeTypeAndSelfTest = ({ globalFilter }) => {
    const [uptakeByType, setUptakeByType] = useState({});
    const [uptakeBySelfTest, setUptakeBySelfTest] = useState({});

    useEffect(() => {
        loadUptakeByType();
        loadUptakeBySelfTest();
    }, [globalFilter]);

    const loadUptakeByType = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        setUptakeByType({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                colorByPoint: true,
                data: [{
                    name: 'COUPLE',
                    y: 25,
                    sliced: true,
                    selected: true
                }, {
                    name: 'INDIVIDUAL',
                    y: 75
                }]
            }]
        });
    };

    const loadUptakeBySelfTest = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        setUptakeBySelfTest({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                colorByPoint: true,
                data: [{
                    name: 'YES',
                    y: 25,
                    sliced: true,
                    selected: true
                }, {
                    name: 'NO',
                    y: 75
                }]
            }]
        });
    };

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UPTAKE BY TYPE
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByType} />
                    </CardBody>
                </Card>
            </div>
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        SELF TEST
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeBySelfTest} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HtsUptakeTypeAndSelfTest;
