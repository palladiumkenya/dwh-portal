import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const CTHomeTXNew = ({ globalFilter }) => {
    const [txNew, setTxNew] = useState({});

    useEffect(() => {
        loadTxNew();
    }, [globalFilter]);

    const loadTxNew = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

        setTxNew({
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
                categories: months,
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
                    text: 'NUMBER OF PATIENTS',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            },{ // Secondary yAxis
                title: {
                    text: 'NUMBER STARTED ON ART',
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
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
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
                name: 'Male',
                type: 'column',
                color: "#1AB394",
                data: [5000, 4000, 750, 5500, 3000, 750],
                tooltip: {
                    valueSuffix: ' '
                }
            }, {
                name: 'Female',
                type: 'column',
                color: "#485969",
                data: [4000, 2000, 750, 5500, 3500, 750],
                tooltip: {
                    valueSuffix: ' '
                }
            }, {
                name: 'Cumulative Tx New',
                type: 'spline',
                yAxis: 1,
                data: [0, 1000, 1250, 3000, 4000, 4250],
                color: "#E06F07",
                tooltip: {
                    valueSuffix: ''
                }
            }]
        });
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TX NEW
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={txNew} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CTHomeTXNew;
