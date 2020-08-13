import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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

        setNumberTestedPositivity({
            chart: { zoomType: 'xy' },
            title: { text: '' },
            subtitle: { text: '' },
            xAxis: { categories: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'], title: { text: null }, visible: true, scrollbar: { enabled: true } },
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
                name: 'NEW',
                data: [5, 3, 4, 7, 2, 5, 7, 5, 3, 8, 9, 4],
                color: "#2F4050"
            }, {
                type: 'column',
                name: 'RETEST',
                data: [2, 2, 3, 2, 1, 3, 4, 8, 6, 2, 3, 5],
                color: "#1AB394"
            },{
                name: 'NS',
                type: 'spline',

                data: [3,2,3,5,1, 4,5,6,4,4, 4,4],
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
                        NUMBER OF PATIENTS TESTED AND POSITIVITY
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
