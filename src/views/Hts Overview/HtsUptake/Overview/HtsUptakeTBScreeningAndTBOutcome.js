import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../../Shared/Api';

const HtsUptakeTBScreeningAndTBOutcome = ({ globalFilter }) => {
    const [screenedTB, setScreenedTB] = useState({});
    const [TBScreeningOutcome, setTBScreeningOutcome] = useState({});

    useEffect(() => {
        loadScreenedTB();
        loadTBScreeningOutcome();
    }, [globalFilter]);

    const loadScreenedTB = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('hts/tbScreened', params);
        let NotScreenedTB = null;
        let ScreenedTB = null;
        if(result.length > 0) {
            NotScreenedTB = parseInt(result[0].NotScreenedTB, 10);
            ScreenedTB = parseInt(result[0].ScreenedTB, 10);
        }


        setScreenedTB({
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
                    name: 'Not Screened For TB',
                    y: NotScreenedTB,
                    color: "#1AB394",
                    sliced: true,
                    selected: true
                }, {
                    name: 'Screened For TB',
                    color: '#2F4050',
                    y: ScreenedTB
                }]
            }]
        });
    };

    const loadTBScreeningOutcome = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('hts/tbScreeningOutcomes', params);
        const tbScreeningOutcomes = [];
        let tested = [];
        let positivity = [];
        for (let i = 0; i < result.length; i++) {
            tbScreeningOutcomes.push(result[i].tbScreeningOutcomes);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }

        setTBScreeningOutcome({
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
                categories: tbScreeningOutcomes,
                crosshair: true
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
    };

    return (
        <div className="row">
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        SCREENED FOR TB
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={screenedTB} />
                    </CardBody>
                </Card>
            </div>
            <div className="col-6">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HIV positivity by TB screening outcomes
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={TBScreeningOutcome} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HtsUptakeTBScreeningAndTBOutcome;
