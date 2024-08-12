import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import * as otzEnrollmentAmongAlhivBySex
    from '../../../selectors/CT/OTZ/otzEnrollmentAmongAlhivBySex';
import * as otzTotalAdolescentsSelector from '../../../selectors/CT/OTZ/otzTotalAdolescents';

const OtzEnrollmentOnOTZBySex = () => {
    const [otzEnrollmentAmongAlHivOnArtBySex, setOtzEnrollmentAmongAlHivOnArtBySex] = useState({});
    const otzEnrollmentsBySex = useSelector(otzEnrollmentAmongAlhivBySex.getOtzEnrollmentAmongAlHivOnArtBySex);
    const adolescents = useSelector(otzTotalAdolescentsSelector.getOtzTotalAdolescentsByGender);

    let femalePercentage = 0;
    let femaleTxCurr = 0;

    let malePercentage = 0;
    let maleTxCurr = 0;

    const femaleVals = otzEnrollmentsBySex.filter(obj => obj.Gender === 'Female');
    const maleVals = otzEnrollmentsBySex.filter(obj => obj.Gender === 'Male');
    if (femaleVals.length > 0) {
        const femaleAdolescents = adolescents.filter(obj => obj.Gender === 'Female');
        if (femaleAdolescents.length > 0) {
            const totalFemaleAdolescents = femaleAdolescents[0].totalAdolescents;
            if (totalFemaleAdolescents > 0) {
                femalePercentage = ((femaleVals[0].TXCurr/totalFemaleAdolescents)*100);
            }
        }
        femaleTxCurr = femaleVals[0].TXCurr;
    }

    if (maleVals.length > 0) {
        console.log(maleVals)
        const maleAdolescents = adolescents.filter(obj => obj.Gender === 'Male');
        if (maleAdolescents.length > 0) {
            const totalMaleAdolescents = maleAdolescents[0].totalAdolescents;
            if (totalMaleAdolescents > 0) {
                malePercentage = ((maleVals[0].TXCurr/totalMaleAdolescents)*100);
            }
        }

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
