import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzVlUptakeAmongAlhivEnrolledInOtzByAge from '../../../selectors/CT/OTZ/otzVlUptakeAmongAlhivEnrolledInOtzByAge';

const VlUptakeAmongAlHivEnrolledInOTZByAge = () => {
    const [vlUptakeAmongAlhivInOtzByAge, setVlUptakeAmongAlhivInOtzByAge] = useState({});
    const vlUptakeAmongAlHivInOtzByAge = useSelector(otzVlUptakeAmongAlhivEnrolledInOtzByAge.getOtzVlUptakeAmongAlhivEnrolledInOtzByAge);

    const loadVlUptakeAmongAlHivOnArtByAge = useCallback(async () => {
        setVlUptakeAmongAlhivInOtzByAge({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: vlUptakeAmongAlHivInOtzByAge.map(obj => obj.ageGroup),
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
                    name: 'VL UPTAKE AMONG ALHIV ENROLLED IN OTZ BY AGE',
                    data: vlUptakeAmongAlHivInOtzByAge,
                    color: '#14084D',
                }
            ]
        });
    }, [vlUptakeAmongAlHivInOtzByAge]);

    useEffect(() => {
        loadVlUptakeAmongAlHivOnArtByAge();
    }, [loadVlUptakeAmongAlHivOnArtByAge]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL UPTAKE AMONG ALHIV ENROLLED IN OTZ BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={vlUptakeAmongAlhivInOtzByAge} />
                </div>
            </CardBody>
        </Card>
    );
};

export default VlUptakeAmongAlHivEnrolledInOTZByAge;

