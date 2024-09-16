import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import * as otzEnrollmentAmongAlhivBySex
    from '../../../selectors/CT/OTZ/otzEnrollmentAmongAlhivBySex';

const OtzEnrollmentOnOTZBySex = () => {
    const [otzEnrollmentAmongAlHivOnArtBySex, setOtzEnrollmentAmongAlHivOnArtBySex] = useState({});
    const otzEnrollmentsBySex = useSelector(otzEnrollmentAmongAlhivBySex.getOtzEnrollmentAmongAlHivOnArtBySex);

    let femaleTxCurr = 0;

    let maleTxCurr = 0;

    const femaleVals = otzEnrollmentsBySex.filter(obj => obj.Gender === 'Female');
    const maleVals = otzEnrollmentsBySex.filter(obj => obj.Gender === 'Male');
    if (femaleVals.length > 0) {
        femaleTxCurr = femaleVals[0].TXCurr;
    }

    if (maleVals.length > 0) {

        maleTxCurr = maleVals[0].TXCurr;
    }

    const loadOtzEnrollmentAmongAlHivOnArtBySex = useCallback(async () => {
        setOtzEnrollmentAmongAlHivOnArtBySex({
            chart: {
                type: 'pie',
                renderTo: 'container'
            },
            title: {
                text: ''
            },
            plotOptions: {
                pie: {
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
                    name: 'OTZ ENROLMENT ON ART BY SEX',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'MALES',
                            y: maleTxCurr,
                            color: '#14084D',
                            text: maleTxCurr
                        },
                        {
                            name: 'FEMALES',
                            y: femaleTxCurr,
                            color: '#EA4C8B',
                            text: femaleTxCurr,
                        }
                    ]
                }
            ]
        });
    },[otzEnrollmentsBySex]);

    useEffect(() => {
        loadOtzEnrollmentAmongAlHivOnArtBySex();
    }, [loadOtzEnrollmentAmongAlHivOnArtBySex]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                OTZ ENROLMENT ON ART BY SEX
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzEnrollmentAmongAlHivOnArtBySex} />
                </div>
            </CardBody>
        </Card>
    );
}

export default OtzEnrollmentOnOTZBySex;
