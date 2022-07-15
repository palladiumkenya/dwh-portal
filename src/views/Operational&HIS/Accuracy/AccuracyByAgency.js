import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AccuracyByAgency = () => {
    const [accuracyByAgency, setAccuracyByAgency] = useState({});

    const loadAccuracyByAgency = useCallback(async () => {
        setAccuracyByAgency({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'AHF', 'CDC', 'DOD', 'ITALIAN COOPERATION', 'USAID', 'NO AGENCY'
                ],
                crosshair: true,
                title: {
                    text: '',
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
                enabled: false,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: 'Records',
                    data: [893, 578, 120, 232, 578, 120],
                    color: '#2F4050',
                },
            ],
        });
    }, []);

    useEffect(() => {
        loadAccuracyByAgency();
    }, [loadAccuracyByAgency]);

    return (
        <Card>
            <CardHeader className="cardTitle">
                OVERALL ACCURACY BY AGENCY
            </CardHeader>
            <CardBody>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={accuracyByAgency}
                />
            </CardBody>
        </Card>
    );
};

export default AccuracyByAgency;
