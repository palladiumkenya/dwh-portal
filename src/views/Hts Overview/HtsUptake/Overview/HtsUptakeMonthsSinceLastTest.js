import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

        setMonthsSinceLastTest({
            chart: { zoomType: 'xy' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: ['<3 MONTHS', '3-6 MONTHS', '6-9 MONTHS', '9-12 MONTHS', '18-24 MONTHS', '24-36 MONTHS', '36-48 MONTHS', '>48 MONTHS'], title: { text: null }, visible: true, scrollbar: { enabled: true } },
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
                data: [5, 3, 4, 7, 20, 10, 6, 15],
                color: "#2F4050"
            },{
                name: 'NS',
                type: 'spline',

                data: [3, 2, 3, 5, 17, 8, 5, 10],
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
                        MONTHS SINCE LAST TEST
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
