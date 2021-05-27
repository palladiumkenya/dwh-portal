import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTraining
    from '../../../selectors/CT/OTZ/otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTraining';

const OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTraining = () => {
    const [vlUptakeAmongAlhivInOtzByCounty, setVlUptakeAmongAlhivInOtzByCounty] = useState({});
    const AlHivEnrolledInOtzWhoHaveCompletedTraining = useSelector(otzProportionOfAlHivEnrolledInOtzWhoHaveCompletedTraining.getProportionOfAlhivEnrolledInOtzWhoHaveCompletedTraining);

    const loadVlUptakeAmongAlHivOnArtByCounty = useCallback(async () => {
        setVlUptakeAmongAlhivInOtzByCounty({
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
                    name: 'PROPORTION OF ALHIV ENROLLED IN OTZ WHO HAVE COMPLETED OTZ TRAINING',
                    colorByPoint: true,
                    data: AlHivEnrolledInOtzWhoHaveCompletedTraining
                }
            ]
        });
    }, [AlHivEnrolledInOtzWhoHaveCompletedTraining]);

    useEffect(() => {
        loadVlUptakeAmongAlHivOnArtByCounty();
    }, [loadVlUptakeAmongAlHivOnArtByCounty]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                PROPORTION OF ALHIV ENROLLED IN OTZ WHO HAVE COMPLETED OTZ TRAINING
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={vlUptakeAmongAlhivInOtzByCounty} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzProportionOfAlHivEnrolledInOtzWhoHaveUndergoneTraining;
