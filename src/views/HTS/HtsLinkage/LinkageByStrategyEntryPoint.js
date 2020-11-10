import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const LinkageByStrategyEntryPoint = ({ globalFilter }) => {
    const [linkageByStrategy, setLinkageByStrategy] = useState({});
    const [linkageByEntryPoint, setLinkageByEntryPoint] = useState({});

    const loadLinkageByStrategy = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const testStrategies = [];
        let positive = [];
        let linkage = [];

        const result = await getAll('hts/linkageByStrategy', params);
        for (let i = 0; i < result.length; i++) {
            testStrategies.push(result[i].testStrategy);
            positive.push(parseInt(result[i].positive, 10));
            const val = parseFloat(parseFloat(result[i].linkage).toFixed(1));
            linkage.push(val);
        }

        setLinkageByStrategy({
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
                    text: 'Number Positive',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Linkage',
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
            tooltip: { shared: true },
            legend: {
                floating: true,
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'top',
                y: 0,
                x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            series: [{
                name: 'Number Positive',
                type: 'column',
                color: "#1AB394",
                data: positive,
                tooltip: {
                    valueSuffix: ' '
                }

            }, {
                name: 'Linkage',
                type: 'spline',
                data: linkage,
                color: "#E06F07",
                yAxis: 1,
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    }, [globalFilter]);

    const loadLinkageByEntryPoint = useCallback(async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const entryPoints = [];
        let positive = [];
        let linkage = [];

        const result = await getAll('hts/linkageByEntryPoint', params);
        for (let i = 0; i < result.length; i++) {
            entryPoints.push(result[i].entryPoint);
            positive.push(parseInt(result[i].positive, 10));
            const val = parseFloat(parseFloat(result[i].linkage).toFixed(1));
            linkage.push(val);
        }

        setLinkageByEntryPoint({
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
                categories: entryPoints,
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
                    text: 'Number Positive',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Linkage',
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
            tooltip: { shared: true },
            legend: {
                floating: true,
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'top',
                y: 0,
                x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            series: [{
                name: 'Number Positive',
                type: 'column',
                color: "#1AB394",
                data: positive,
                tooltip: {
                    valueSuffix: ' '
                }

            }, {
                name: 'Linkage',
                type: 'spline',
                data: linkage,
                color: "#E06F07",
                yAxis: 1,
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    }, [globalFilter]);

    useEffect(() => {
        loadLinkageByStrategy();
        loadLinkageByEntryPoint();
    }, [loadLinkageByStrategy, loadLinkageByEntryPoint]);

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        LINKAGE BY STRATEGY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={linkageByStrategy} />
                    </CardBody>
                </Card>
            </div>

            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        LINKAGE BY ENTRY POINT
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={linkageByEntryPoint} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default LinkageByStrategyEntryPoint;
