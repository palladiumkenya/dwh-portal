import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadSuppressionByYearSelectors from '../../../selectors/CT/ViralLoad/viralLoadSuppressionByYearAndSuppressionCategory';

const ViralLoadSuppressionByYear = () => {
    const [viralLoadSuppressionByYear, setViralLoadSuppressionByYear] = useState({});
    const viralLoadSuppressionByYearData = useSelector(viralLoadSuppressionByYearSelectors.getViralLoadSuppressionByYearAndSuppressionCategory);

    const loadViralLoadSuppressionByYear = useCallback(async () => {
        setViralLoadSuppressionByYear({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: viralLoadSuppressionByYearData.yearCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'HVL', data: viralLoadSuppressionByYearData.data[0], type: 'column',color: "#E15759", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LLV', data: viralLoadSuppressionByYearData.data[1], type: 'column', color: "#F28E2B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'VS', data: viralLoadSuppressionByYearData.data[2], type: 'column', color: "#3475B3", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [viralLoadSuppressionByYearData]);

    useEffect(() => {
        loadViralLoadSuppressionByYear();
    }, [loadViralLoadSuppressionByYear]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        Levels of Viral suppression by year of ART
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadSuppressionByYear} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadSuppressionByYear;
