import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../../Shared/Api';

const HtsUptakeMonthsSinceLastTest = ({ globalFilter }) => {
    const [monthsSinceLastTest, setMonthsSinceLastTest] = useState({});

    useEffect(() => {
        loadMonthsSinceLastTest();
    }, [globalFilter]);

    const loadMonthsSinceLastTest = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = await getAll('hts/monthsSinceLastTest', params);

        const monthsSinceLastTest = [];
        let tested = [];
        let positivity = [];
        for (let i = 0; i < result.length; i++) {
            monthsSinceLastTest.push(result[i].MonthLastTest);
            tested.push(parseInt(result[i].Tested, 10));
            positivity.push(parseFloat(result[i].positivity));
        }

        setMonthsSinceLastTest({
            chart: { zoomType: 'xy' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: monthsSinceLastTest, title: { text: null }, visible: true, scrollbar: { enabled: true } },
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
            }, { // Secondary yAxis
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
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            credits: { enabled: false },
            responsive: { rules: [ { condition: { maxWidth: 400, }, chartOptions: { legend: { enabled: false } } } ] },
            series: [{
                name: 'Number tested',
                type: 'column',
                data: tested,
                color: "#1AB394",
            },{
                name: 'HIV positivity',
                type: 'spline',
                yAxis: 1,
                data: positivity,
                color: '#E06F07',
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
                        HTS uptake and positivity by duration since last HIV test
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={monthsSinceLastTest} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default HtsUptakeMonthsSinceLastTest;
