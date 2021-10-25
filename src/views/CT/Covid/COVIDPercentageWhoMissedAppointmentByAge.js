import { Card, CardBody, CardHeader } from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import * as covidPercentageWhoMissedAppointmentsByAgeGroupSelectors from '../../../selectors/CT/Covid/covidPercentageWhoMissedAppointmentsByAgeGroup';
import { useSelector } from 'react-redux';

const COVIDPercentageWhoMissedAppointmentByAge = () => {
    const [missedAppointmentsByAge, setMissedAppointmentsByAge] = useState({});
    const percentageOfMissedAppointmentsByAgeGroup = useSelector(covidPercentageWhoMissedAppointmentsByAgeGroupSelectors.getPercentageWhoMissedAppointmentsByAgeGroup);

    const loadMissedAppointmentsByAge = useCallback(async () => {
        setMissedAppointmentsByAge({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: percentageOfMissedAppointmentsByAgeGroup.map(obj => obj.agegroup),
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'PERCENTAGE OF PATIENTS'
                },
                labels: { format: '{value} %' }
            },
            legend: {
                enabled: false
            },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.y + '%'; } }, tooltip: { valueSuffix: '% ({point.text:.0f})' }, }},
            series: [
                {
                    name: 'PERCENTAGE OF MISSED APPOINTMENT DUE TO COVID BY AGE',
                    data: percentageOfMissedAppointmentsByAgeGroup,
                    color: '#14084D',
                }
            ]
        });
    }, [percentageOfMissedAppointmentsByAgeGroup]);

    useEffect(() => {
        loadMissedAppointmentsByAge();
    }, [loadMissedAppointmentsByAge]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PERCENTAGE OF PLHIV WHO MISSED APPOINTMENT DUE TO COVID -19 INFECTION BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className={"row"}>
                    <div className={"col-12"}>
                        <HighchartsReact highcharts={Highcharts} options={missedAppointmentsByAge} />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDPercentageWhoMissedAppointmentByAge;
