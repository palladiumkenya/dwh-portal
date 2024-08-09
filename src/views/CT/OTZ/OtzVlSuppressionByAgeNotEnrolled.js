import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzVlSuppressionByAgeSelector from '../../../selectors/CT/OTZ/otzVlSuppressionByAge';

const OtzVlSuppressionByAgeNotEnrolled = () => {
    const [otzVlSuppressionByAge, setOtzVlSuppressionByAge] = useState({});
    const vlSuppressionAge = useSelector(
        otzVlSuppressionByAgeSelector.getOtzVlSuppressionByAgeNotEnrolled
    );

    const loadVlSuppressionByAge = useCallback(async () => {
        setOtzVlSuppressionByAge({
            title: { text: '' },
            plotOptions: {
                column: {
                    stacking: 'percent',
                    dataLabels: {
                        enabled: true,
                        format: '{point.percentage:.0f}%',
                    },
                },
            },
            xAxis: [
                { categories: vlSuppressionAge.ageGroups, crosshair: true },
            ],
            yAxis: [{ title: { text: 'PERCENTAGE OF PATIENTS' } }],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'HIGH RISK LLV',
                    data: vlSuppressionAge.data[2],
                    type: 'column',
                    color: '#bb1414',
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'LOW RISK LLV',
                    data: vlSuppressionAge.data[1],
                    type: 'column',
                    color: '#F08532',
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'LDL',
                    data: vlSuppressionAge.data[0],
                    type: 'column',
                    color: '#00AD30',
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
            ],
        });
    }, [vlSuppressionAge]);

    useEffect(() => {
        loadVlSuppressionByAge();
    }, [loadVlSuppressionByAge]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL SUPPRESSION AMONG ALHIV NOT ENROLLED IN OTZ BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzVlSuppressionByAge} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzVlSuppressionByAgeNotEnrolled;
