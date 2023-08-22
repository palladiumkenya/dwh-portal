import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { useSelector } from 'react-redux';
import * as tracing from '../../../selectors/CT/TreatmentOutcomes/tracingIIT';
HighchartsMore(Highcharts);

const TrackingIIT = () => {
    const [appointmentKeeping, setAppointmentKeeping] = useState({});

    const appointmentData = useSelector(tracing.getIITTracing);

    const loadAppointmentKeeping = useCallback(async () => {
        setAppointmentKeeping({
            chart: {
                type: 'pie',
            },
            title: {
                text: '',
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
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y})',
                    },
                    showInLegend: true,
                },
            },
            series: [
                {
                    name: 'PATIENTS',
                    data: [
                        {
                            name: 'IIT TRACKED NO',
                            y: appointmentData.data[0],
                            color: '#1AB394',
                        },
                        {
                            name: 'IIT TRACKED YES',
                            y: appointmentData.data[1],
                            color: 'cyan',
                        },
                    ],
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
                TRACKING OF IIT CLIENTS
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

export default TrackingIIT;
