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
        let tested_male = [];
        let tested_female = [];
        let positivity = [];
        let positivity_male = [];
        let positivity_female = [];

        const result = await getAll('hts/uptakeByAgeSex', params);
        for(let i = 0; i < result.length; i++) {
            if(result[i].Gender === 'Male') {
                tested_male.push(parseInt(result[i].Tested, 10));
                ageGroups.push(result[i].AgeGroup);
                const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
                positivity_male.push(val);
            } else if (result[i].Gender === 'Female') {
                tested_female.push(parseInt(result[i].Tested, 10));
                const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
                positivity_female.push(val);
            }
        }

        for(let i = 0; i < positivity_male.length; i++) {
            let val = (positivity_male[i] + positivity_female[i])/2;
            val = parseFloat(parseFloat(val).toFixed(1));
            positivity[i] = val;
        }

        setUptakeByAgeSex({
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
                categories: ageGroups,
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
                    text: 'Number tested',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            },{ // Secondary yAxis
                title: {
                    text: 'HIV positivity',
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
                name: 'MALE',
                type: 'column',
                color: "#1AB394",
                data: tested_male,
                tooltip: {
                    valueSuffix: ' '
                }
            }, {
                name: 'FEMALE',
                type: 'column',
                color: "#485969",
                data: tested_female,
                tooltip: {
                    valueSuffix: ' '
                }
            }, {
                name: 'HIV positivity',
                type: 'spline',
                yAxis: 1,
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
                        HTS uptake and positivity by age and sex
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
