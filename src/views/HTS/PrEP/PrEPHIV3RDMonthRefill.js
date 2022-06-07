import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const PrEP3RDMonthRefill = () => {
    const filters = useSelector(state => state.filters);
    const [prep3RDMonthRefill, setPrep3RDMonthRefill] = useState({});

    const loadPrep3RDMonthRefill = useCallback(async () => {
        setPrep3RDMonthRefill({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    '15-19 YRS',
                    '20-24 YRS',
                    '25-29 YRS',
                    '30-34 YRS',
                    '35-39 YRS',
                    '40-44 YRS',
                    '45-49 YRS',
                    '50 +',
                    'UNKNOWN AGE',
                ],
                crosshair: true,
                title: {
                    text: 'AGE GROUP',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF PATIENTS',
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
            },
            plotOptions: {
                scatter: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}%',
                    },
                },
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'TOTAL REFILL MONTH 1',
                    data: [23.6, 78.8, 98.5, 20, 10, 50, 70, 20, 90],
                    color: '#14084D',
                },
                {
                    name: 'TOTAL TESTED',
                    data: [18, 45, 90, 27, 19, 70, 50, 70, 100],
                    color: '#00a65a',
                },
                {
                    type: 'scatter',
                    name: '% OF PATIENTS REFILLED',
                    data: [83.6, 78.8, 98, 67, 97, 50, 70, 80, 90],
                    color: 'orange',
                    marker: {
                        symbol: 'circle',
                    },
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrep3RDMonthRefill();
    }, [loadPrep3RDMonthRefill]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                HIV TESTING AT 3RD MONTH PREP REFILL
            </CardHeader>
            <CardBody>
                <HighchartsReact highcharts={Highcharts} options={prep3RDMonthRefill}/>
            </CardBody>
        </Card>
    );
};

export default PrEP3RDMonthRefill;
