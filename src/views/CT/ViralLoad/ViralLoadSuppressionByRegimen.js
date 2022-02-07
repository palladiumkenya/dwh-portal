import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadSuppressionByRegimenSelectors from '../../../selectors/CT/ViralLoad/viralLoadSuppressionByRegimen';

const ViralLoadSuppressionByRegimen = () => {
    const [viralLoadSuppressionByRegimen, setViralLoadSuppressionByRegimen] = useState({});
    const viralLoadSuppressionByRegimenData = useSelector(viralLoadSuppressionByRegimenSelectors.getViralLoadSuppressionByRegimen);

    const loadViralLoadSuppressionByRegimen = useCallback(async () => {
        setViralLoadSuppressionByRegimen({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: viralLoadSuppressionByRegimenData.regimenCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'HVL', data: viralLoadSuppressionByRegimenData.data[1], type: 'column',color: "#E15759", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LLV', data: viralLoadSuppressionByRegimenData.data[2], type: 'column', color: "#F28E2B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LDL', data: viralLoadSuppressionByRegimenData.data[0], type: 'column', color: "#3475B3", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [viralLoadSuppressionByRegimenData]);

    useEffect(() => {
        loadViralLoadSuppressionByRegimen();
    }, [loadViralLoadSuppressionByRegimen]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL OUTCOMES AMONG CURRENT ON ART PATIENTS BY ART REGIMEN/OPTIMIZATION
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadSuppressionByRegimen} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadSuppressionByRegimen;
