import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { useSelector } from 'react-redux';
import * as tracing from '../../../selectors/CT/TreatmentOutcomes/tracingIIT';
HighchartsMore(Highcharts);

const IITTracingContact = () => {
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
                categories: appointmentData[1].labels,
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
                pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                valueSuffix: ' %',
                shared: true,
                enabled: true,
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
                    pointPadding: 0.001,
                    borderWidth: 0,
                    enableMouseTracking: true,
                    tooltip: { valueSuffix: '%' },
                },
            },
            series: [
                {
                    name: 'Patients',
                    data: appointmentData[1].percentages,
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
                OUTCOMES OF TRACKING IIT CLIENTS WHO WERE REACHED
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

export default IITTracingContact;
