import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzEnrollmentAmongAlHivByAge from '../../../selectors/CT/OTZ/otzEnrollmentAmongAlHivByAge';

const OtzEnrollmentAmongAlhivOnArtByAge = () => {
    const [otzEnrollmentAmongAlhivOnArtByAge, setOtzEnrollmentAmongAlhivOnArtByAge] = useState({});
    const otzEnrollmentsByAge = useSelector(otzEnrollmentAmongAlHivByAge.getOtzEnrollmentAmongAlHivOnArtByAge);

    const loadOtzEnrollmentAmongAlhivOnArtByAge = useCallback(async () => {
        setOtzEnrollmentAmongAlhivOnArtByAge({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: otzEnrollmentsByAge.map(obj => obj.ageGroup),
                crosshair: true
            },
            yAxis: {
                type: 'logarithmic',
                minorTickInterval: 0.1,
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
                    name: 'OTZ ENROLMENT AMONG ALHIV AND ON ART BY AGE',
                    data: otzEnrollmentsByAge,
                    color: '#14084D',
                }
            ]
        });
    }, [otzEnrollmentsByAge]);

    useEffect(() => {
        loadOtzEnrollmentAmongAlhivOnArtByAge();
    }, [loadOtzEnrollmentAmongAlhivOnArtByAge]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ ENROLlMENT AMONG ALHIV AND ON ART BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzEnrollmentAmongAlhivOnArtByAge} />
                </div>
            </CardBody>
        </Card>
    );
}

export default OtzEnrollmentAmongAlhivOnArtByAge;
