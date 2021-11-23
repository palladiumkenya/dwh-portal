import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const COVIDCumulativeReceivedVaccination = () => {
    const [cumulativeVaccinatedByMonths, setCumulativeVaccinatedByMonths] = useState({});

    const loadNewOnArtTrendsChart = useCallback(async () => {
        setCumulativeVaccinatedByMonths({
            title: { text: '' },
            xAxis: [{ categories: ['DEC 2020', 'JAN 2021', 'FEB 2021', 'MAR 2021', 'APR 2021', 'MAY 2021', 'JUNE 2021', 'JULY 2021'], title: { text: 'Months' }, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients'}}],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: {
                formatter: function () {
                    return 'Series: CUMULATIVE NUMBER OF ADULT PLHIV WHO RECIEVED AT LEAST ONE DOSE OF COVID - 19 VACCINE <br><b>' + this.x +': </b>' + this.y + '</b><br>' + this.point.text;
                }
            },
            series: [
                { name: 'Number of Patients', data: [1900, 24000, 47000, 63000, 89000, 120000, 130000, 160000], type: 'spline', color: "#E06F07" },
            ]
        });
    }, []);

    useEffect(() => {
        loadNewOnArtTrendsChart();
    }, []);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                CUMULATIVE NUMBER OF ADULT PLHIV WHO RECEIVED AT LEAST ONE DOSE OF COVID - 19 VACCINE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={cumulativeVaccinatedByMonths} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDCumulativeReceivedVaccination;
