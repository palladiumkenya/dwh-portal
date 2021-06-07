import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzVlUptakeAmongAlhivEnrolledInOtzByCounty from '../../../selectors/CT/OTZ/otzVlUptakeAmongAlhivEnrolledInOtzByCounty';

const VlUptakeAmongAlHivEnrolledInOTZByCounty = () => {
    const [vlUptakeAmongAlhivInOtzByCounty, setVlUptakeAmongAlhivInOtzByCounty] = useState({});
    const vlUptakeAmongAlHivInOtzByCounty = useSelector(otzVlUptakeAmongAlhivEnrolledInOtzByCounty.getOtzVlUptakeAmongAlhivEnrolledInOtzByCounty);

    const loadVlUptakeAmongAlHivOnArtByCounty = useCallback(async () => {
        setVlUptakeAmongAlhivInOtzByCounty({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: vlUptakeAmongAlHivInOtzByCounty.map(obj => obj.County),
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
                    name: 'VL UPTAKE AMONG ALHIV ENROLLED IN OTZ BY COUNTY',
                    data: vlUptakeAmongAlHivInOtzByCounty,
                    color: '#14084D',
                }
            ]
        });
    }, [vlUptakeAmongAlHivInOtzByCounty]);

    useEffect(() => {
        loadVlUptakeAmongAlHivOnArtByCounty();
    }, [loadVlUptakeAmongAlHivOnArtByCounty]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL UPTAKE AMONG ALHIV ENROLLED IN OTZ BY COUNTY
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={vlUptakeAmongAlhivInOtzByCounty} />
                </div>
            </CardBody>
        </Card>
    );
};

export default VlUptakeAmongAlHivEnrolledInOTZByCounty;
