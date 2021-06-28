import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingMales
    from '../../../selectors/CT/OTZ/otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingMales';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingMales = () => {
    const [proportionOfMalesWhoHaveCompletedTraining, setProportionOfMalesWhoHaveCompletedTraining] = useState({});
    const AlHivEnrolledInOtzWhoHaveCompletedTraining = useSelector(otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTrainingMales.getProportionOfAlhivEnrolledInOtzWhoHaveCompletedTrainingMales);

    const loadProportionOfMalesWhoHaveCompletedTraining = useCallback(async () => {
        setProportionOfMalesWhoHaveCompletedTraining({
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
                    innerSize: '60%',
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
                    name: 'PROPORTION OF ALHIV ENROLLED IN OTZ WHO HAVE COMPLETED OTZ TRAINING - MALE',
                    colorByPoint: true,
                    data: AlHivEnrolledInOtzWhoHaveCompletedTraining
                }
            ]
        });
    }, [AlHivEnrolledInOtzWhoHaveCompletedTraining]);

    useEffect(() => {
        loadProportionOfMalesWhoHaveCompletedTraining();
    }, [loadProportionOfMalesWhoHaveCompletedTraining]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF ALHIV ENROLLED IN OTZ WHO HAVE COMPLETED OTZ TRAINING - MALE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={proportionOfMalesWhoHaveCompletedTraining} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTrainingMales;
