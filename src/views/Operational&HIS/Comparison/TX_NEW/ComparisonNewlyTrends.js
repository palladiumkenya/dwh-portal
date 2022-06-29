import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const ComparisonNewlyTrends = () => {
    const filters = useSelector((state) => state.filters);
    const [
        comparisonNewlyTrends,
        setComparisonNewlyTrends,
    ] = useState({});

    const loadComparisonNewlyTrends = useCallback(async () => {
        setComparisonNewlyTrends({
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
            },
            series: [
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: true,
                    },
                    name: 'DWH',
                    data: [32, 100, 90, 27, 19, 70, 50, 70, 100],
                    color: '#2F4050',
                },
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: true
                    },
                    name: 'KHIS',
                    data: [11, 130, 190, 327, 219, 470, 150,77 , 80],
                    color: '#1AB394',
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadComparisonNewlyTrends();
    }, [loadComparisonNewlyTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TRENDS OF NEWLY STARTED PATIENTS ON ART
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={comparisonNewlyTrends}
                />
            </CardBody>
        </Card>
    );
};

export default ComparisonNewlyTrends;
