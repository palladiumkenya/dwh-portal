import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../../Shared/Api';

const NumberTestedAndPositivity = ({ globalFilter }) => {
    const [numberTestedPositivity, setNumberTestedPositivity] = useState({});

    useEffect(() => {
        loadNumberTestedPositivity();
    }, [globalFilter]);

    const loadNumberTestedPositivity = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('hts/numberTestedAndPositivity', params);
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };

        let months = [];
        let positivity = [];
        let tested_new = [];
        let tested_retest = [];
        let positivity_new = [];
        let positivity_retest = [];

        for(let i = 0; i < result.length; i++) {
            if(result[i].TestedBefore === 'New') {
                tested_new.push(parseInt(result[i].Tested, 10));
                months.push(monthNames[result[i].month]);
                const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
                positivity_new.push(val);
            } else if(result[i].TestedBefore === 'Retest') {
                tested_retest.push(parseInt(result[i].Tested, 10));
                const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
                positivity_retest.push(val);
            }
        }

        for(let i = 0; i < positivity_new.length; i++) {
            let val = (positivity_new[i] + positivity_retest[i])/2;
            val = parseFloat(parseFloat(val).toFixed(1));
            positivity[i] = val;
        }

        setNumberTestedPositivity({
            chart: {
                zoomType: 'xy'
            },
            title: {
                useHTML: true,
                text: ' &nbsp;',
                align: 'left'
            },
            subtitle: {
                text: ' ',
                align: 'left'
            },
            xAxis: [{
                categories: months,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: 'HIV positivity',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Number tested',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} ',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }

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
                x: 80,
                verticalAlign: 'top',
                y: 55,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [
                {
                    name: 'New',
                    type: 'column',
                    color: "#1AB394",
                    yAxis: 1,
                    data: tested_new,
                    tooltip: {
                        valueSuffix: ' '
                    }
                },
                {
                    name: 'Retest',
                    type: 'column',
                    color: "#485969",
                    yAxis: 1,
                    data: tested_retest,
                    tooltip: {
                        valueSuffix: ' '
                    }

                },
                {
                    name: 'HIV positivity',
                    type: 'spline',
                    color: "#E06F07",
                    yAxis: 0,
                    data: positivity,
                    tooltip: {
                        valueSuffix: ' %'
                    }
                }
            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            floating: false,
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            x: 0,
                            y: 0
                        },
                        yAxis: [{
                            labels: {
                                align: 'right',
                                x: 0,
                                y: -6
                            },
                            showLastLabel: false
                        }, {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -6
                            },
                            showLastLabel: false
                        }, {
                            visible: false
                        }]
                    }
                }]
            }
        });
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HTS Uptake and HIV positivity by month
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={numberTestedPositivity} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NumberTestedAndPositivity;
