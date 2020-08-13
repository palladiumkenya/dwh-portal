import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../../Shared/Api';

const HtsUptakeByAgeSex = ({ globalFilter }) => {
    const [uptakeByAgeSex, setUptakeByAgeSex] = useState({});

    useEffect(() => {
        loadUptakeByAgeSex();
    }, [globalFilter]);

    const loadUptakeByAgeSex = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const ageGroups = [];
        let tested = [];
        let positivity = [];

        const result = await getAll('hts/uptakeByAgeSex', params);
        for(let i = 0; i < result.length; i++) {
            ageGroups.push(result[i].AgeGroup);
            tested.push(parseInt(result[i].Tested, 10));
            positivity.push(parseFloat(result[i].positivity));
        }

        setUptakeByAgeSex({
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
                categories: ageGroups,
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
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UPTAKE BY AGE AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={uptakeByAgeSex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HtsUptakeByAgeSex;
