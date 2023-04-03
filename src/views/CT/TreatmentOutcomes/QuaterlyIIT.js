import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { useSelector } from 'react-redux';
import * as otzEnrollment from '../../../selectors/CT/OTZ/otzEnrollmentTrend';
HighchartsMore(Highcharts);

const QuaterlyIIT = () => {
    const [appointmentKeeping, setAppointmentKeeping] = useState({});

    const appointmentData = useSelector(otzEnrollment.getOtzEnrolled);

    const loadAppointmentKeeping = useCallback(async () => {
        setAppointmentKeeping({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: ['2022 Q1', '2022 Q2', '2022 Q3', '2022 Q4'],
                crosshair: true,
                title: {
                    text: 'MONTHS',
                },
            },
            yAxis: [
                {
                    min: 0,
                    title: {
                        text: 'NUMBER OF PATIENTS',
                    },
                },
                {
                    max: 100,
                    labels: {
                        style: {
                            color: 'orange',
                        },
                    },
                    title: {
                        text: 'PERCENTAGE OF PATIENTS',
                        style: {
                            color: 'orange',
                        },
                    },
                    opposite: true,
                },
            ],
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
                    stacking: 'normal',
                    pointPadding: 0.01,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    type: 'column',
                    name: 'TX <3 MONTHS',
                    data: [500, 232, 623, 954],
                    color: '#2F4050',
                },
                {
                    type: 'column',
                    name: 'TX 3-5 MONTHS',
                    data: [430, 324, 530, 342],
                    color: 'rgb(124, 181, 236)',
                },
                {
                    type: 'column',
                    name: 'TX 6+ MONTHS',
                    data: [420, 124, 630, 442],
                    color: 'pink',
                },
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: false,
                    },
                    yAxis: 1,
                    crisp: false,
                    name: '% OVERALL IIT',
                    data: [83, 73, 67, 43],
                    color: 'orange',
                },
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: false,
                    },
                    yAxis: 1,
                    crisp: true,
                    name: '% IIT <3 MONTHS',
                    data: [19, 30, 55, 70],
                    color: 'green',
                },
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: false,
                    },
                    yAxis: 1,
                    crisp: false,
                    name: '% IIT 3-5 MONTHS',
                    data: [9, 23, 16, 3],
                    color: 'red',
                },
                {
                    type: 'spline',
                    dashStyle: 'shortdot',
                    marker: {
                        enabled: false,
                    },
                    yAxis: 1,
                    crisp: false,
                    name: '% IIT 6+ MONTHS',
                    data: [12, 50, 17, 33],
                    color: 'black',
                },
            ],
        });
    }, [appointmentData]);

    useEffect(() => {
        loadAppointmentKeeping();
    }, [loadAppointmentKeeping]);

    return (
        <Card className="trends-card">
            <CardHeader
                className="trends-header"
                style={{ textTransform: 'none' }}
            >
                APPOINTMENT KEEPING WATERFALL ANALYSIS
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={appointmentKeeping}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

export default QuaterlyIIT;
