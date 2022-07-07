import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PrEPDiagnosedWithSTITrends = () => {
    const filters = useSelector((state) => state.filters);
    const [prepDiagnosedWithSTITrends, setPrepDiagnosedWithSTITrends] = useState({});

    const loadPrepDiagnosedWithSTITrends = useCallback(async () => {
        setPrepDiagnosedWithSTITrends({
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
                    name: "",
                    data: [236, 146, 70, 222, 140, 232, 153, 344, 476],
                    color: '#E06F07',
                    fillOpacity: 0.66,
                    marker: {
                        radius: 7,
                        fillColor: '#E06F07CC',
                    },
                    showInLegend: false,
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadPrepDiagnosedWithSTITrends();
    }, [loadPrepDiagnosedWithSTITrends]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                DIAGNOSED WITH STI TRENDS (MAY 2021 - JAN 2022)
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={prepDiagnosedWithSTITrends}
                />
            </CardBody>
        </Card>
    );
};

export default PrEPDiagnosedWithSTITrends;
