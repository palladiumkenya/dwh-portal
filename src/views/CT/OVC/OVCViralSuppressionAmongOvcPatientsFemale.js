import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcViralSuppressionAmongOvcPatientsFemaleSelector
    from '../../../selectors/CT/OVC/ovcViralSuppressionAmongOvcPatientsFemale';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OVCViralSuppressionAmongOvcPatientsFemale = () => {
    const [ovcViralSuppressionAmongOvcPatientsFemale, setOvcViralSuppressionAmongOvcPatientsFemale] = useState({});
    const ViralSuppressionAmongOvcPatientsFemale = useSelector(ovcViralSuppressionAmongOvcPatientsFemaleSelector.getOvcViralSuppressionAmongOvcPatientsFemale);

    const loadOvcViralSuppressionAmongOvcPatientsFemale = useCallback(async () => {
        setOvcViralSuppressionAmongOvcPatientsFemale({
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
                    name: 'VIRAL SUPPRESSION AMONG OVC PATIENTS - FEMALE',
                    colorByPoint: true,
                    data: ViralSuppressionAmongOvcPatientsFemale
                }
            ]
        });
    }, [ViralSuppressionAmongOvcPatientsFemale]);

    useEffect(() => {
        loadOvcViralSuppressionAmongOvcPatientsFemale();
    }, [loadOvcViralSuppressionAmongOvcPatientsFemale]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VIRAL SUPPRESSION AMONG OVC PATIENTS - FEMALE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcViralSuppressionAmongOvcPatientsFemale} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OVCViralSuppressionAmongOvcPatientsFemale;
