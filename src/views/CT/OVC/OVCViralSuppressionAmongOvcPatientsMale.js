import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcViralSuppressionAmongOvcPatientsMaleSelector
    from '../../../selectors/CT/OVC/ovcViralSuppressionAmongOvcPatientsMale';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OVCViralSuppressionAmongOvcPatientsMale = () => {
    const [ovcViralSuppressionAmongOvcPatientsMale, setOvcViralSuppressionAmongOvcPatientsMale] = useState({});
    const ViralSuppressionAmongOvcPatientsMale = useSelector(ovcViralSuppressionAmongOvcPatientsMaleSelector.getOvcViralSuppressionAmongOvcPatientsMale);

    const loadOvcViralSuppressionAmongOvcPatientsMale = useCallback(async () => {
        setOvcViralSuppressionAmongOvcPatientsMale({
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
                    name: 'VIRAL SUPPRESSION AMONG OVC PATIENTS - MALE',
                    colorByPoint: true,
                    data: ViralSuppressionAmongOvcPatientsMale
                }
            ]
        });
    }, [ViralSuppressionAmongOvcPatientsMale]);

    useEffect(() => {
        loadOvcViralSuppressionAmongOvcPatientsMale();
    }, [loadOvcViralSuppressionAmongOvcPatientsMale]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VIRAL SUPPRESSION AMONG OVC PATIENTS - MALE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcViralSuppressionAmongOvcPatientsMale} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OVCViralSuppressionAmongOvcPatientsMale;
