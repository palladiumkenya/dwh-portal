import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const HtsUptakeTestingStrategy = ({ globalFilters }) => {
    const [hivTestingType, setHivTestingType] = useState({});
    const [uptakeByEntryPoint, setUptakeByEntryPoint] = useState({});

    const loadHivTestingType = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
        }

        const testStrategies = [];
        let tested = [];
        let positivity = [];

        const result = await getAll('hts/uptakeByTestStrategy', params);
        for (let i = 0; i < result.length; i++) {
            testStrategies.push(result[i].TestStrategy);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }

        setHivTestingType({
            chart: {
                zoomType: 'xy'
            },
            title: {
                useHTML: true,
                text: ' &nbsp;',
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: testStrategies,
                crosshair: true,
                title: {
                    text: 'Strategies'
                }
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Number Tested',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'HIV Positivity',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            tooltip: { shared: true },
            legend: {
                floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Number Tested',
                type: 'column',
                color: "#1AB394",
                data: tested,
                tooltip: {
                    valueSuffix: ' '
                }

            }, {
                name: 'HIV Positivity',
                type: 'spline',
                data: positivity,
                color: "#E06F07",
                yAxis: 1,
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    }, [globalFilters]);

    const loadUptakeByEntryPoint = useCallback(async () => {
        let params = null;

        if (globalFilters) {
            params = { ...globalFilters };
        }

        const testStrategies = [];
        let tested = [];
        let positivity = [];

        const result = await getAll('hts/uptakeByEntryPoint', params);
        for (let i = 0; i < result.length; i++) {
            testStrategies.push(result[i].EntryPoint);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }


        setUptakeByEntryPoint({
            chart: {
                zoomType: 'xy'
            },
            title: {
                useHTML: true,
                text: ' &nbsp;',
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: testStrategies,
                crosshair: true,
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Number Tested',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'HIV Positivity',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} %',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            tooltip: { shared: true },
            legend: {
                floating: true, layout: 'horizontal', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Number Tested',
                type: 'column',
                color: "#1AB394",
                data: tested,
                tooltip: {
                    valueSuffix: ' '
                }

            }, {
                name: 'HIV Positivity',
                type: 'spline',
                data: positivity,
                color: "#E06F07",
                yAxis: 1,
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    }, [globalFilters]);

    useEffect(() => {
        loadHivTestingType();
        loadUptakeByEntryPoint();
    }, [loadHivTestingType, loadUptakeByEntryPoint]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HTS uptake by strategy
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={hivTestingType} />
                    </CardBody>
                </Card>
            </div>

            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Uptake and positivity by entry point
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
