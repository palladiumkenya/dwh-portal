import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
                    name: 'NO',
                    y: 25,
                    sliced: true,
                    selected: true
                }, {
                    name: 'YES',
                    y: 75
                }]
            }]
        });
    };

    const loadTBScreeningOutcome = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        setTBScreeningOutcome({
            chart: { zoomType: 'xy' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: ['NO TB SIGNS', 'PRESUMED TB', 'TB TREATMENT'], title: { text: null }, visible: true, scrollbar: { enabled: true } },
            yAxis: { min: 0, title: { text: 'TESTS' }, stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                } },
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
                type: 'column',
                data: [5, 3, 4],
                color: "#2F4050"
            },{
                name: 'NS',
                type: 'spline',

                data: [3, 2, 3],
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
