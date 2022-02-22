import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as covidCumulativeNumberAdultPLHIVWhoReceivedAtLeastOneDoseSelectors
    from '../../../selectors/CT/Covid/covidCumulativeNumberAdultPLHIVWhoReceivedAtLeastOneDose';

const COVIDCumulativeReceivedVaccination = () => {
    const [cumulativeVaccinatedByMonths, setCumulativeVaccinatedByMonths] = useState({});
    const cumulativeWhoReceivedAtLeastOneVaccine = useSelector(covidCumulativeNumberAdultPLHIVWhoReceivedAtLeastOneDoseSelectors.getCumulativeNumberAdultsWithCovidVaccine);

    const loadNewOnArtTrendsChart = useCallback(async () => {
        setCumulativeVaccinatedByMonths({
            title: { text: '' },
            xAxis: [{ categories: cumulativeWhoReceivedAtLeastOneVaccine.yearMonths, title: { text: 'Months' }, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients'}}],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: {
                formatter: function () {
                    return 'Series: CUMULATIVE NUMBER OF PLHIV WHO RECIEVED AT LEAST ONE DOSE OF COVID - 19 VACCINE <br><b>' + this.x +': </b>' + this.y + '</b>';
                }
            },
            series: [
                { name: 'Number of Patients', data: cumulativeWhoReceivedAtLeastOneVaccine.cumulative, type: 'spline', color: "#E06F07" },
            ]
        });
    }, [cumulativeWhoReceivedAtLeastOneVaccine]);

    useEffect(() => {
        loadNewOnArtTrendsChart();
    }, [loadNewOnArtTrendsChart]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                CUMULATIVE NUMBER OF PLHIV WHO RECEIVED AT LEAST ONE DOSE OF COVID - 19 VACCINE
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
