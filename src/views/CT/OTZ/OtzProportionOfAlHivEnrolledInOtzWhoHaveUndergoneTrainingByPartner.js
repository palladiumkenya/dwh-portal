import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByPartner from '../../../selectors/CT/OTZ/otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByPartner';

const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByPartner = () => {
    const [proportionOfAlHivEnrolledInWhoWhoHaveTrainedByPartner, setProportionOfAlHivEnrolledInWhoWhoHaveTrainedByPartner] = useState({});
    const proportionByPartner = useSelector(otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByPartner.getProportionOfAlhivEnrolledInOtzWhoHaveCompletedTrainingByPartner);

    const loadProportionByPartner = useCallback(async () => {
        setProportionOfAlHivEnrolledInWhoWhoHaveTrainedByPartner({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: proportionByPartner.map(obj => obj.partner),
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
                    name: 'PROPORTION OF ALHIV ENROLLED IN OTZ WHO HAVE COMPLETED OTZ TRAINING BY PARTNER',
                    data: proportionByPartner,
                    color: '#14084D',
                }
            ]
        });
    }, [proportionByPartner]);

    useEffect(() => {
        loadProportionByPartner();
    }, [loadProportionByPartner]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF ALHIV ENROLLED IN OTZ WHO HAVE COMPLETED OTZ TRAINING BY PARTNER
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfAlHivEnrolledInWhoWhoHaveTrainedByPartner} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByPartner;
