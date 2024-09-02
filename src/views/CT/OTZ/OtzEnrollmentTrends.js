import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzEnrollment from '../../../selectors/CT/OTZ/otzEnrollmentTrend';

const OtzEnrollmentTrends = () => {
    const [
        otzEnrollmentAmongAlhivOnArtByMonth,
        setEnrollmentAmongAlhivOnArtByMonth,
    ] = useState({});

    const otzEnrollmentsByMonths = useSelector(otzEnrollment.getOtzEnrolled);

    const loadOtzEnrollmentAmongAlhivOnArtByMonth = useCallback(async () => {
        setEnrollmentAmongAlhivOnArtByMonth({
            chart: {
                type: 'line',
            },
            title: {
                text: '',
            },
            xAxis: {
                categories: otzEnrollmentsByMonths.months.map((m) =>
                    m.toUpperCase()
                ),
                crosshair: true,
            },
            yAxis: {
                title: {
                    text: 'NUMBER OF PATIENTS',
                },
                labels: { format: '{value} ' },
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '' + this.point.y + '';
                        },
                    },
                    tooltip: { valueSuffix: '' },
                },
            },
            series: [
                {
                    name: '',
                    data: otzEnrollmentsByMonths.data,

                    color: '#14084D',
                },
            ],
        });
    }, [otzEnrollmentsByMonths]);

    useEffect(() => {
        loadOtzEnrollmentAmongAlhivOnArtByMonth();
    }, [loadOtzEnrollmentAmongAlhivOnArtByMonth]);

    return (
        <Card className="trends-card">
            <CardHeader
                className="trends-header"
                style={{ textTransform: 'none' }}
            >
                OTZ ENROLMENT TRENDS BY MONTH
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={otzEnrollmentAmongAlhivOnArtByMonth}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzEnrollmentTrends;
