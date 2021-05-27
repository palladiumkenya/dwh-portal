import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzEnrollmentAmongAlHivByCounty from '../../../selectors/CT/OTZ/otzEnrollmentAmongAlHivByCounty';

const OtzEnrollmentAmongAlhivOnArtByCounty = () => {
    const [otzEnrollmentAmongAlhivOnArtByCounty, setEnrollmentAmongAlhivOnArtByCounty] = useState({});
    const otzEnrollmentsByCounty = useSelector(otzEnrollmentAmongAlHivByCounty.getOtzEnrollmentAmongAlHivOnArtByCounty);

    const loadOtzEnrollmentAmongAlhivOnArtByAge = useCallback(async () => {
        setEnrollmentAmongAlhivOnArtByCounty({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: otzEnrollmentsByCounty.map(obj => obj.County),
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
                    name: 'OTZ ENROLMENT AMONG ALHIV AND ON ART BY COUNTY',
                    data: otzEnrollmentsByCounty,
                    color: '#14084D',
                }
            ]
        });
    }, [otzEnrollmentsByCounty]);

    useEffect(() => {
        loadOtzEnrollmentAmongAlhivOnArtByAge();
    }, [loadOtzEnrollmentAmongAlhivOnArtByAge]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ ENROLMENT AMONG ALHIV AND ON ART BY COUNTY
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzEnrollmentAmongAlhivOnArtByCounty} />
                </div>
            </CardBody>
        </Card>
    );
}

export default OtzEnrollmentAmongAlhivOnArtByCounty;
