import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const PrEPEligibleVsNewInitiatedTrends = () => {
    const filters = useSelector((state) => state.filters);
    const [
        prepEligibleVsNewInitiatedTrends,
        setPrepEligibleVsNewInitiatedTrends,
    ] = useState({});

    const loadPrepEligibleVsNewInitiatedTrends = useCallback(async () => {
        setPrepEligibleVsNewInitiatedTrends({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'MAY-2021',
                    'JUN-2021',
                    'JUL-2021',
                    'AUG-2021',
                    'SEP-2021',
                    'OCT-2021',
                    'NOV-2021',
                    'DEC-2021',
                    'JAN-2022',
                ],
                crosshair: true,
                title: {
                    text: 'MONTHS',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'PERCENTAGE OF PATIENTS',
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
                column: {
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    type: 'column',
                    name: 'TOTAL ELIGIBLE',
                    data: [23.6, 78.8, 98.5, 20, 10, 50, 70, 20, 90],
                    color: '#2F4050',
                },
                {
                    type: 'column',
                    name: 'TOTAL INITIATED (NEW)',
                    data: [18, 45, 90, 27, 19, 70, 50, 70, 100],
                    color: 'rgb(124, 181, 236)',
                },
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: false,
                    },
                    crisp: false,
                    name: '% INITIATED',
                    data: [32, 100, 90, 27, 19, 70, 50, 70, 100],
                    color: 'orange',
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepEligibleVsNewInitiatedTrends();
    }, [loadPrepEligibleVsNewInitiatedTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                ELIGIBLE VS NEWLY INITIATED ON PREP TRENDS (MAY 2021 - JAN 2022)
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepEligibleVsNewInitiatedTrends}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPEligibleVsNewInitiatedTrends;
