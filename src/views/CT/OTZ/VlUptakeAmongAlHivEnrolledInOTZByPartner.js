import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzVlUptakeAmongAlhivEnrolledInOtzByPartner
    from '../../../selectors/CT/OTZ/otzVlUptakeAmongAlhivEnrolledInOtzByPartner';

const VlUptakeAmongAlHivEnrolledInOTZByPartner = () => {
    const [vlUptakeAmongAlhivInOtzByPartner, setVlUptakeAmongAlhivInOtzByPartner] = useState({});
    const vlUptakeAmongAlHivInOtzByPartner = useSelector(otzVlUptakeAmongAlhivEnrolledInOtzByPartner.getOtzVlUptakeAmongAlhivEnrolledInOtzByPartner);

    const loadVlUptakeAmongAlHivOnArtByPartner = useCallback(async () => {
        setVlUptakeAmongAlhivInOtzByPartner({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: vlUptakeAmongAlHivInOtzByPartner.map(obj => obj.partner),
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
                    name: 'VL UPTAKE AMONG ALHIV ENROLLED IN OTZ BY PARTNER',
                    data: vlUptakeAmongAlHivInOtzByPartner,
                    color: '#14084D',
                }
            ]
        });
    }, [vlUptakeAmongAlHivInOtzByPartner]);

    useEffect(() => {
        loadVlUptakeAmongAlHivOnArtByPartner();
    }, [loadVlUptakeAmongAlHivOnArtByPartner]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL UPTAKE AMONG ALHIV ENROLLED IN OTZ BY PARTNER
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={vlUptakeAmongAlhivInOtzByPartner} />
                </div>
            </CardBody>
        </Card>
    );
};

export default VlUptakeAmongAlHivEnrolledInOTZByPartner;
