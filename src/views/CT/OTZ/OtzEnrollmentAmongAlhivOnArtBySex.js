import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import * as otzEnrollmentAmongAlhivBySex
    from '../../../selectors/CT/OTZ/otzEnrollmentAmongAlhivBySex';
import * as otzTotalAdolescentsSelector from '../../../selectors/CT/OTZ/otzTotalAdolescents';

const OtzEnrollmentAmongAlhivOnArtBySex = () => {
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
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['MALES', 'FEMALES'],
                crosshair: true
            },
            yAxis: {
                type: 'logarithmic',
                minorTickInterval: 0.1,
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
                    name: 'OTZ ENROLMENT AMONG ALHIV AND ON ART BY SEX',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'MALES',
                            y: Math.round((malePercentage + Number.EPSILON) * 100) / 100,
                            color: '#14084D',
                            text: maleTxCurr
                        },
                        {
                            name: 'FEMALES',
                            y: Math.round((femalePercentage + Number.EPSILON) * 100) / 100,
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
                OTZ ENROLMENT AMONG ALHIV AND ON ART BY SEX
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzEnrollmentAmongAlHivOnArtBySex} />
                </div>
            </CardBody>
        </Card>
    );
}

export default OtzEnrollmentAmongAlhivOnArtBySex;
