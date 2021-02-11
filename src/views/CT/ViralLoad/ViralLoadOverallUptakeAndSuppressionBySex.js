import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadOverallUptakeSuppressionBySexSelectors from '../../../selectors/CT/ViralLoad/viralLoadOverallUptakeSuppressionBySex';

const ViralLoadOverallUptakeAndSuppressionBySex = () => {
    const [vlOverallUptakeAndSuppression, setViralLoadOverallUptakeAndSuppressionBySex] = useState({});
    const viralLoadOverallUptakeSuppressionBySexData = useSelector(viralLoadOverallUptakeSuppressionBySexSelectors.getViralLoadOverallUptakeSuppressionBySex);

    const loadViralLoadOverallUptakeAndSuppressionBySex = useCallback(async () => {
        setViralLoadOverallUptakeAndSuppressionBySex({
            title: { text: '' },
            xAxis: [{ categories: viralLoadOverallUptakeSuppressionBySexData.vlCategoryNames, crosshair: true }],
            yAxis: [
                { title: { text: 'Number of Patients' } }
            ],
            tooltip: { shared: true },
            plotOptions: { column: { stacking: 'normal', dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'MALE', data: viralLoadOverallUptakeSuppressionBySexData.data[0], type: 'column', color: "#14084D", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'FEMALE', data: viralLoadOverallUptakeSuppressionBySexData.data[1], type: 'column', color: "#EA4C8B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [viralLoadOverallUptakeSuppressionBySexData]);

    useEffect(() => {
        loadViralLoadOverallUptakeAndSuppressionBySex();
    }, [loadViralLoadOverallUptakeAndSuppressionBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        OVERALL VL UPTAKE AND SUPPRESSION AMONG CURRENT ON ART PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlOverallUptakeAndSuppression} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadOverallUptakeAndSuppressionBySex;
