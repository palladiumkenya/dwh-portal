import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzVlSuppressionBySexSelector from '../../../selectors/CT/OTZ/otzVlSuppressionBySex';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OtzVlSuppressionBySexNotEnrolled = () => {
    const [otzVlSuppressionBySex, setOtzVlSuppressionBySex] = useState({});
    const vlSuppressionGender = useSelector(
        otzVlSuppressionBySexSelector.getOtzVlSuppressionBySexNotEnrolled
    );

    const loadVlSuppressionBySex = useCallback(async () => {
        setOtzVlSuppressionBySex({
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
                {
                    categories: vlSuppressionGender.genders.map((g) =>
                        g.toUpperCase()
                    ),
                    crosshair: true,
                },
            ],
            yAxis: [{ title: { text: 'PERCENTAGE OF PATIENTS' } }],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'HIGH RISK LLV',
                    data: vlSuppressionGender.data[2],
                    type: 'column',
                    color: '#bb1414',
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'LOW RISK LLV',
                    data: vlSuppressionGender.data[1],
                    type: 'column',
                    color: '#F08532',
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
                {
                    name: 'LDL',
                    data: vlSuppressionGender.data[0],
                    type: 'column',
                    color: '#00AD30',
                    tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' },
                },
            ],
        });
    }, [vlSuppressionGender]);

    useEffect(() => {
        loadVlSuppressionBySex();
    }, [loadVlSuppressionBySex]);

    return (
        <Card className="trends-card">
            <CardHeader
                className="trends-header"
                style={{ textTransform: 'none' }}
            >
                VL SUPPRESSION AMONG ALHIV NOT ENROLLED IN OTZ BY GENDER
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={otzVlSuppressionBySex}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzVlSuppressionBySexNotEnrolled;
