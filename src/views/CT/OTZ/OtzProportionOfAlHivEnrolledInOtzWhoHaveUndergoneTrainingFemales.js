import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingFemales
    from '../../../selectors/CT/OTZ/otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingFemales';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingFemales = () => {
    const [proportionOfFemalesWhoHaveCompletedTraining, setProportionOfFemalesWhoHaveCompletedTraining] = useState({});
    const AlHivEnrolledInOtzWhoHaveCompletedTraining = useSelector(otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingFemales.getProportionOfAlhivEnrolledInOtzWhoHaveCompletedTrainingFemales);

    const loadProportionOfFemalesWhoHaveCompletedTraining = useCallback(async () => {
        setProportionOfFemalesWhoHaveCompletedTraining({
            chart: {
                type: 'pie',
                renderTo: 'container'
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                text: ''
            },
            plotOptions: {
                pie: {
                    innerSize: '80%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> <br/> {point.percentage:.1f} % <br/> ({point.y})'
                    },
                    showInLegend: true
                }
            },
            series: [
                {
                    name: 'PROPORTION OF ALHIV ENROLLED IN OTZ WHO HAVE COMPLETED OTZ TRAINING - FEMALE',
                    colorByPoint: true,
                    data: AlHivEnrolledInOtzWhoHaveCompletedTraining
                }
            ]
        });
    }, [AlHivEnrolledInOtzWhoHaveCompletedTraining]);

    useEffect(() => {
        loadProportionOfFemalesWhoHaveCompletedTraining();
    }, [loadProportionOfFemalesWhoHaveCompletedTraining]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF ALHIV ENROLLED IN OTZ WHO HAVE COMPLETED OTZ TRAINING - FEMALE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfFemalesWhoHaveCompletedTraining} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingFemales;
