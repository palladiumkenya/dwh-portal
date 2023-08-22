import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { useSelector } from 'react-redux';
import * as tracing from '../../../selectors/CT/TreatmentOutcomes/tracingIIT';
HighchartsMore(Highcharts);

const IITTracingNoContact = () => {
    const [appointmentKeeping, setAppointmentKeeping] = useState({});

    const appointmentData = useSelector(tracing.getIITTracingOutcomes).data;

    const loadAppointmentKeeping = useCallback(async () => {
        setAppointmentKeeping({
            chart: {
                type: 'column',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: appointmentData[0].labels,
                crosshair: true,
                title: {
                    text: '',
                },
            },
            yAxis: [
                {
                    min: 0,
                    max: 100,
                    title: {
                        text: 'PERCENTAGE OF PATIENTS',
                    },
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
                enabled: false,
                align: 'left',
                verticalAlign: 'top',
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        crop: false,
                        overflow: 'none',
                        formatter: function () {
                            // Append a suffix to the label's value
                            return this.y + ' %';
                        },
                    },
                    stacking: 'normal',
                    pointPadding: 0.01,
                    tooltip: { valueSuffix: '%' },
                    borderWidth: 0,
                },
            },
            series: [
                {
                    type: 'column',
                    name: 'Patients',
                    data: appointmentData[0].percentages,
                    color: 'cyan',
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
                TRACKING OUTCOMES AMONG UNREACHED IIT CLIENTS
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

export default IITTracingNoContact;
