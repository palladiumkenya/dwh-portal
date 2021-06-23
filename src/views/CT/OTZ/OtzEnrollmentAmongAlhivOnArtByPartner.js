import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzEnrollmentAmongAlHivByPartner from '../../../selectors/CT/OTZ/otzEnrollmentAmongAlHivByPartner';

const OtzEnrollmentAmongAlhivOnArtByPartner = () => {
    const [otzEnrollmentAmongAlhivOnArtByPartner, setEnrollmentAmongAlhivOnArtByPartner] = useState({});
    const otzEnrollmentsByPartner = useSelector(otzEnrollmentAmongAlHivByPartner.getOtzEnrollmentAmongAlHivOnArtByPartner);

    const loadOtzEnrollmentAmongAlhivOnArtByPartner = useCallback(async () => {
        setEnrollmentAmongAlhivOnArtByPartner({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: otzEnrollmentsByPartner.map(obj => obj.partner),
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
                    name: 'OTZ ENROLMENT AMONG ALHIV AND ON ART BY PARTNER',
                    data: otzEnrollmentsByPartner,
                    color: '#14084D',
                }
            ]
        });
    }, [otzEnrollmentsByPartner]);

    useEffect(() => {
        loadOtzEnrollmentAmongAlhivOnArtByPartner();
    }, [loadOtzEnrollmentAmongAlhivOnArtByPartner]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ ENROLMENT AMONG ALHIV AND ON ART BY PARTNER
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzEnrollmentAmongAlhivOnArtByPartner} />
                </div>
            </CardBody>
        </Card>
    );
}

export default OtzEnrollmentAmongAlhivOnArtByPartner;
