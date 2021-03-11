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
            xAxis: [{ categories: viralLoadSuppressionByRegimenData.regimenCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percent of Patients' }, labels: { format: '{value} %' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.text; } } }},
            series: [
                { name: 'Viral Load Suppression', data: viralLoadSuppressionByRegimenData.data, type: 'column', color: "#485969", tooltip: { valueSuffix: ' % ({point.absoluteY})' }}
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
