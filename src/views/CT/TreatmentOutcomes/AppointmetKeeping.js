import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { useSelector } from 'react-redux';
import * as appointmentKeepingSelector from '../../../selectors/CT/TreatmentOutcomes/appointmentKeepingWaterfall';

HighchartsMore(Highcharts);

const AppointmetKeeping = () => {
    const [appointmentKeeping, setAppointmentKeeping] = useState({});

    const appointmentData = useSelector(
        appointmentKeepingSelector.getAppointmentKeepingWaterfall
    );

    const loadAppointmentKeeping = useCallback(async () => {
        setAppointmentKeeping({
            chart: {
                type: 'waterfall',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: [
                    'CAME BEFORE',
                    'ON TIME',
                    'MISSED 1-7 DAYS',
                    'MISSED 8-14 DAYS',
                    'MISSED 15-30 DAYS',
                    'IIT AND RTT WITHIN 30 DAYS',
                    'IIT AND RTT BEYOND 30 DAYS',
                    'STILL IIT',
                    'LOST IN HMIS',
                    'DEAD',
                    'TRANSFERRED OUT',
                    'STOPPED',
                    'TOTAL',
                ],
                crosshair: true,
            },
            yAxis: {
                // minorTickInterval: 0.1,
                title: {
                    text: 'NUMBER OF PATIENTS',
                },
                labels: { format: '{value} ' },
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                series: {
                    pointPadding: 0,
                    groupPadding: 0,
                },
                waterfall: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    pointPadding: 0,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '' + this.point.y + '';
                        },
                    },
                    tooltip: { valueSuffix: '%' },
                },
            },
            series: [
                {
                    lineWidth: 0,
                    data: [
                        {
                            name: 'CAME BEFORE',
                            y: appointmentData.camebefore,
                            color: 'green',
                        },
                        {
                            name: 'ON TIME',
                            y: appointmentData.ontime,
                            color: 'green',
                        },
                        {
                            name: 'MISSED 1-7 DAYS',
                            y: appointmentData.missed1_7,
                            color: 'green',
                        },
                        {
                            name: 'MISSED 8-14 DAYS',
                            y: appointmentData.missed8_14,
                            color: 'green',
                        },
                        {
                            name: 'MISSED 15-30 DAYS',
                            y: appointmentData.missed15_30,
                            color: 'green',
                        },
                        {
                            name: 'IIT AND RTT WITHIN 30 DAYS',
                            y: appointmentData.rttw30,
                            color: 'green',
                        },
                        {
                            name: 'IIT AND RTT BEYOND 30 DAYS',
                            y: appointmentData.rttb30,
                            color: 'green',
                        },
                        {
                            name: 'STILL IIT',
                            y: -appointmentData.iit,
                            color: 'red',
                        },
                        {
                            name: 'LOST IN HMIS',
                            y: -appointmentData.lost,
                            color: 'red',
                        },
                        {
                            name: 'DEAD',
                            y: -appointmentData.dead,
                            color: 'red',
                        },
                        {
                            name: 'TRANSFERRED OUT',
                            y: -appointmentData.trans,
                            color: 'red',
                        },
                        {
                            y: -appointmentData.stopped,
                            color: 'red',
                        },
                        {
                            name: 'TOTAL',
                            isIntermediateSum: true,
                        },
                    ],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return (
                                Highcharts.numberFormat(
                                    this.y,2,'.',','
                                ) + '%'
                            );
                        },
                        style: {
                            fontWeight: 'bold',
                        },
                    },
                    pointPadding: 0,
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

export default AppointmetKeeping;
