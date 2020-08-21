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
        const result_positivity = await getAll('hts/uptakeByPositivity', params);
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };

        const today = new Date();
        const today_lastyear = new Date();
        const lastYear = new Date(today_lastyear.setFullYear(today.getFullYear() - 1));
        const lastFullYear = lastYear.getFullYear();
        const lastYearMonth = lastYear.getMonth() + 1;
        const fullYear = today.getFullYear();
        const year = params.year;

        let months = [];
        let positivity = [];
        let tested_new = [];
        let tested_retest = [];

        for(let i = 0; i < result.length; i++) {
            const result_month = result[i].month;
            const result_year = result[i].year.toString();

            if((year.toString() == fullYear.toString()) && (result_month <= lastYearMonth && result_year.toString() == lastFullYear.toString())) {
                continue;
            }

            if(result[i].TestedBefore === 'New') {
                tested_new.push(parseInt(result[i].Tested, 10));
                months.push(monthNames[result[i].month]);
            } else if(result[i].TestedBefore === 'Retest') {
                tested_retest.push(parseInt(result[i].Tested, 10));
            }
        }

        for(let i = 0; i < result_positivity.length; i++) {
            const result_month = result_positivity[i].MONTH;
            const result_year = result_positivity[i].YEAR.toString();
            if ((year.toString() == fullYear.toString()) && (result_month <= lastYearMonth && result_year.toString() == lastFullYear.toString())) {
                continue;
            }

            const val = parseFloat(parseFloat(result_positivity[i].positivity).toFixed(1));
            positivity.push(val);
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
                    text: 'HIV Positivity',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Number Tested',
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
                    name: 'HIV Positivity',
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
                        HTS Uptake and Hiv Positivity by Month
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
