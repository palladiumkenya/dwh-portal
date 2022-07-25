import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const PrEPScreeningByAge = () => {
    const filters = useSelector(state => state.filters);
    const [prepScreeningByAge, setPrepScreeningByAge] = useState({});

    const loadPrepScreeningByAge = useCallback(async () => {
        setPrepScreeningByAge({
            chart: {
                type: 'column'
            },
            title:{
                text:''
            },
            xAxis: {
                categories: [
                    '15 TO 19',
                    '20 TO 24',
                    '25+',
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF PATIENTS'
                }
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',

            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
                shared: true,
            },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [{
                name: 'SCREENED',
                data: [83.6, 78.8, 98.5],
                color: '#142459'
            }, {
                name: 'ELIGIBLE',
                data: [12, 20, 43],
                color: 'rgb(144, 237, 125)'
            }, {
                name: 'INITIATED TO PREP',
                data: [53, 64, 14],
                color: '#00a65a'
            }]
        });
    }, []);

    useEffect(() => {
        loadPrepScreeningByAge();
    }, [loadPrepScreeningByAge]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                SCREENING FOR PREP BY AGE
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={prepScreeningByAge} />
            </CardBody>
        </Card>
    );
};

export default PrEPScreeningByAge;
