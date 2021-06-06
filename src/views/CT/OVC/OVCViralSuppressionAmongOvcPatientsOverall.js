import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcViralSuppressionAmongOvcPatientsOverallSelector
    from '../../../selectors/CT/OVC/ovcViralSuppressionAmongOvcPatientsOverall';

const OVCViralSuppressionAmongOvcPatientsOverall = () => {
    const [ovcViralSuppressionAmongOvcPatientsOverall, setOvcViralSuppressionAmongOvcPatientsOverall] = useState({});
    const ViralSuppressionAmongOvcPatientsOverall = useSelector(ovcViralSuppressionAmongOvcPatientsOverallSelector.getOvcViralSuppressionAmongOvcPatientsOverall);

    const loadOvcViralSuppressionAmongOvcPatientsOverall = useCallback(async () => {
        setOvcViralSuppressionAmongOvcPatientsOverall({
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
                    name: 'VIRAL SUPPRESSION AMONG OVC PATIENTS - OVERALL',
                    colorByPoint: true,
                    data: ViralSuppressionAmongOvcPatientsOverall
                }
            ]
        });
    }, [ViralSuppressionAmongOvcPatientsOverall]);

    useEffect(() => {
        loadOvcViralSuppressionAmongOvcPatientsOverall();
    }, [loadOvcViralSuppressionAmongOvcPatientsOverall]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VIRAL SUPPRESSION AMONG OVC PATIENTS - OVERALL
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={ovcViralSuppressionAmongOvcPatientsOverall} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OVCViralSuppressionAmongOvcPatientsOverall;
