import { Card, CardBody, CardHeader } from 'reactstrap';
import React, { useCallback, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import * as covidPercentageWhoMissedAppointmentsByCountySelectors
    from '../../../selectors/CT/Covid/covidPercentageWhoMissedAppointmentsByCounty';

const COVIDPercentageWhoMissedAppointmentByCounty = () => {
    const [missedAppointmentsByCounty, setMissedAppointmentsByCounty] = useState({});
    const percentageOfMissedAppointmentsByCounty = useSelector(covidPercentageWhoMissedAppointmentsByCountySelectors.getPercentageWhoMissedAppointmentsByCounty);

    const loadMissedAppointmentsByCounty = useCallback(async () => {
        setMissedAppointmentsByCounty({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: percentageOfMissedAppointmentsByCounty.map(obj => obj.county),
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
                    name: 'PERCENTAGE OF MISSED APPOINTMENT DUE TO COVID BY COUNTY',
                    data: percentageOfMissedAppointmentsByCounty,
                    color: '#14084D',
                }
            ]
        });
    }, [percentageOfMissedAppointmentsByCounty]);

    useEffect(() => {
        loadMissedAppointmentsByCounty();
    }, [loadMissedAppointmentsByCounty]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PERCENTAGE OF PLHIV WHO MISSED APPOINTMENTS DUE TO COVID-19 INFECTION BY COUNTY
            </CardHeader>
            <CardBody className="trends-body">
                <div className={"row"}>
                    <div className={"col-12"}>
                        <HighchartsReact highcharts={Highcharts} options={missedAppointmentsByCounty} />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDPercentageWhoMissedAppointmentByCounty;

