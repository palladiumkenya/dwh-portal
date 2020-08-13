import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../../Shared/Api';

const HtsUptakeTestingStrategy = ({ globalFilter }) => {
    const [hivTestingType, setHivTestingType] = useState({});
    const [uptakeByEntryPoint, setUptakeByEntryPoint] = useState({});

    useEffect(() => {
        loadHivTestingType();
        loadUptakeByEntryPoint();
    }, [globalFilter]);

    const loadHivTestingType = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const testStrategies = [];
        let tested = [];
        let positivity = [];

        const result = await getAll('hts/uptakeByTestStrategy', params);
        for (let i = 0; i < result.length; i++) {
            testStrategies.push(result[i].TestStrategy);
            tested.push(parseInt(result[i].Tested, 10));
            positivity.push(parseFloat(result[i].positivity));
        }

        setHivTestingType({
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: testStrategies,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'POSITIVITY',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'TESTS',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 7,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'TESTS',
                type: 'column',
                color: "#1AB394",
                yAxis: 1,
                data: tested,
                tooltip: {
                    valueSuffix: ' '
                }

            }, {
                name: 'Positivity',
                type: 'spline',
                data: positivity,
                color: "#E06F07",
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    };

    const loadUptakeByEntryPoint = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const testStrategies = [];
        let tested = [];
        let positivity = [];

        const result = await getAll('hts/uptakeByEntryPoint', params);
        for (let i = 0; i < result.length; i++) {
            testStrategies.push(result[i].EntryPoint);
            tested.push(parseInt(result[i].Tested, 10));
            positivity.push(parseFloat(result[i].positivity));
        }


        setUptakeByEntryPoint({
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: testStrategies,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'POSITIVITY',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'TESTS',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 7,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'TESTS',
                type: 'column',
                color: "#1AB394",
                yAxis: 1,
                data: tested,
                tooltip: {
                    valueSuffix: ' '
                }

            }, {
                name: 'Positivity',
                type: 'spline',
                data: positivity,
                color: "#E06F07",
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    };

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HIV TESTING STRATEGY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={hivTestingType} />
                    </CardBody>
                </Card>
            </div>

            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UPTAKE BY ENTRY POINT
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByEntryPoint} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HtsUptakeTestingStrategy;
