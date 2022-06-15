import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PrEPDiscontinuationTrends = () => {
    const filters = useSelector((state) => state.filters);
    const [prepDiscontinuationTrends, setPrepDiscontinuationTrends] = useState(
        {}
    );

    const loadPrepDiscontinuationTrends = useCallback(async () => {
        setPrepDiscontinuationTrends({
            chart: {
                defaultSeriesType: 'area',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'MAY 2021',
                    'JUNE 2021',
                    'JULY 2021',
                    'AUGUST 2021',
                    'SEPTEMBER 2021',
                    'OCT 2021',
                    'NOV 2021',
                    'DEC 2021',
                    'JAN 2022',
                ],
                crosshair: true,
                title: {
                    text: 'MONTHS',
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'NUMBER OF PATIENTS',
                },
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat:
                    '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
                shared: true,
            },
            series: [
                {
                    name: 'DISCORDANT COUPLES',
                    data: [23.6, 46, 70, 22, 40, 32, 53, 64, 76],
                    color: '#1AB394',
                    fillOpacity: 0.2,
                    marker: {
                        radius: 7,
                        fillColor: '#1AB394CC',
                    },
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepDiscontinuationTrends();
    }, [loadPrepDiscontinuationTrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                TRENDS OF PrEP DISCONTINUATION
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepDiscontinuationTrends}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPDiscontinuationTrends;
