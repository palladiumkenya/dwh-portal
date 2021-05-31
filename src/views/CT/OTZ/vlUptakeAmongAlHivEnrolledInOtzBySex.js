import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as otzVlUptakeAmongAlhivEnrolledInOtzBySex
    from '../../../selectors/CT/OTZ/otzVlUptakeAmongAlhivEnrolledInOtzBySex';
import { useSelector } from 'react-redux';

const VLUptakeAmongAlHivEnrolledInOtzBySex = () => {
    const [vlUptakeAmongAlhivInOtzBySex, setVlUptakeAmongAlhivInOtzBySex] = useState({});
    const vlUptakeAmongAlHivInOtzBySex = useSelector(otzVlUptakeAmongAlhivEnrolledInOtzBySex.getOtzVlUptakeAmongAlhivEnrolledInOtzBySex);

    let femalePercentage = 0;
    let femaleText = null;

    let malePercentage = 0;
    let maleText = null;

    const femaleVals = vlUptakeAmongAlHivInOtzBySex.filter(obj => obj.Gender === 'Female');
    const maleVals = vlUptakeAmongAlHivInOtzBySex.filter(obj => obj.Gender === 'Male');
    if (femaleVals.length > 0) {
        femalePercentage = Math.round(femaleVals[0].vl_uptake_percent);
        femaleText = 'lastVL: ' +  femaleVals[0].lastVL + ' eligibleVL: ' + femaleVals[0].eligibleVL;
    }

    if (maleVals.length > 0) {
        malePercentage = Math.round(maleVals[0].vl_uptake_percent);
        maleText = 'lastVL: ' +  maleVals[0].lastVL + ' eligibleVL: ' + maleVals[0].eligibleVL;
    }

    const loadVlUptakeAmongAlHivOnArtBySex = useCallback(async () => {
        setVlUptakeAmongAlhivInOtzBySex({
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
                    name: 'VL UPTAKE AMONG ALHIV ENROLLED IN OTZ BY SEX',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'MALES',
                            y: malePercentage,
                            color: '#14084D',
                            text: maleText
                        },
                        {
                            name: 'FEMALES',
                            y: femalePercentage,
                            color: '#EA4C8B',
                            text: femaleText,
                        }
                    ]
                }
            ]
        });
    },[vlUptakeAmongAlHivInOtzBySex]);

    useEffect(() => {
        loadVlUptakeAmongAlHivOnArtBySex();
    }, [loadVlUptakeAmongAlHivOnArtBySex]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL UPTAKE AMONG ALHIV ENROLLED IN OTZ BY SEX
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={vlUptakeAmongAlhivInOtzBySex} />
                </div>
            </CardBody>
        </Card>
    );
}

export default VLUptakeAmongAlHivEnrolledInOtzBySex;
