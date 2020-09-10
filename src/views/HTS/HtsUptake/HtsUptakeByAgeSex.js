import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';

const HtsUptakeByAgeSex = ({ globalFilter }) => {
    const [uptakeByAgeSex, setUptakeByAgeSex] = useState({});

    const loadUptakeByAgeSex = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const ageGroups = [];
        let tested_male = [];
        let tested_female = [];
        let positivity = [];

        const result = await getAll('hts/uptakeByAgeSex', params);
        const result_positivity = await getAll('hts/uptakeByAgeSexPositivity', params);
        for(let i = 0; i < result.length; i++) {
            if(result[i].Gender === 'Male' || result[i].Gender === 'M') {
                tested_male.push(parseInt(result[i].Tested, 10));
                ageGroups.push(result[i].AgeGroup);
            } else if (result[i].Gender === 'Female' || result[i].Gender === 'F') {
                tested_female.push(parseInt(result[i].Tested, 10));
            }
        }

        for(let i = 0; i < ageGroups.length; i++) {
            for(let j = 0; j < result_positivity.length; j++) {
                if(ageGroups[i] === result_positivity[j].AgeGroup) {
                    const val = parseFloat(parseFloat(result_positivity[j].positivity).toFixed(1));
                    positivity.push(val);
                }
            }
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
            },{ // Secondary yAxis
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
                data: tested_male,
                tooltip: {
                    valueSuffix: ' '
                }
            }, {
                name: 'Female',
                type: 'column',
                color: "#485969",
                data: tested_female,
                tooltip: {
                    valueSuffix: ' '
                }
            }, {
                name: 'HIV Positivity',
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

    useEffect(() => {
        loadUptakeByAgeSex();
    }, [globalFilter]);

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
