import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByCounty from '../../../selectors/CT/OTZ/otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByCounty';

const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByCounty = () => {
    const [proportionOfAlHivEnrolledInWhoWhoHaveTrainedByCounty, setProportionOfAlHivEnrolledInWhoWhoHaveTrainedByCounty] = useState({});
    const proportionByCounty = useSelector(otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingByCounty.getProportionOfAlhivEnrolledInOtzWhoHaveCompletedTrainingByCounty);

    const loadProportionByCounty = useCallback(async () => {
        setProportionOfAlHivEnrolledInWhoWhoHaveTrainedByCounty({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: proportionByCounty.map(obj => obj.County),
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
                    name: 'PROPORTION OF ALHIV ENROLLED IN OTZ WHO HAVE COMPLETED OTZ TRAINING BY COUNTY',
                    data: proportionByCounty.map(obj => obj.proportion_training_percent),
                    color: '#14084D',
                }
            ]
        });
    }, [proportionByCounty]);

    useEffect(() => {
        loadProportionByCounty();
    }, [loadProportionByCounty]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF ALHIV ENROLLED IN OTZ WHO HAVE COMPLETED OTZ TRAINING BY COUNTY
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfAlHivEnrolledInWhoWhoHaveTrainedByCounty} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingByCounty;
