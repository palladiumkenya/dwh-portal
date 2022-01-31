import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadSuppressionByAgeSelectors from '../../../selectors/CT/ViralLoad/viralLoadSuppressionByAge';

const ViralLoadSuppressionByAge = () => {
    const [viralLoadSuppressionByAge, setViralLoadSuppressionByAge] = useState({});
    const viralLoadSuppressionByAgeData = useSelector(viralLoadSuppressionByAgeSelectors.getViralLoadSuppressionByAge);

    const loadViralLoadSuppressionByAge = useCallback(async () => {
        setViralLoadSuppressionByAge({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: viralLoadSuppressionByAgeData.ageCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'HVL', data: viralLoadSuppressionByAgeData.data[2], type: 'column', color: "#E15759", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LLV', data: viralLoadSuppressionByAgeData.data[1], type: 'column', color: "#F28E2B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LDL', data: viralLoadSuppressionByAgeData.data[0], type: 'column', color: "#3475B3", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [viralLoadSuppressionByAgeData]);

    useEffect(() => {
        loadViralLoadSuppressionByAge();
    }, [loadViralLoadSuppressionByAge]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VIRAL SUPPRESSION (LESS THAN 400 CPM) AMONG CURRENT ON ART PATIENTS BY AGE GROUP
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadSuppressionByAge} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadSuppressionByAge;
