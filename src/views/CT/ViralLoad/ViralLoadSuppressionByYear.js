import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadSuppressionByYearSelectors from '../../../selectors/CT/ViralLoad/viralLoadSuppressionByYear';

const ViralLoadSuppressionByYear = () => {
    const [viralLoadSuppressionByYear, setViralLoadSuppressionByYear] = useState({});
    const viralLoadSuppressionByYearData = useSelector(viralLoadSuppressionByYearSelectors.getViralLoadSuppressionByYear);

    const loadViralLoadSuppressionByYear = useCallback(async () => {
        setViralLoadSuppressionByYear({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: viralLoadSuppressionByYearData.yearCategories, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: '3 MONTHS', data: viralLoadSuppressionByYearData.data[0], type: 'column', color: "#485969", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '6 MONTHS', data: viralLoadSuppressionByYearData.data[1], type: 'column', color: "#BBE65F", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '12 MONTHS', data: viralLoadSuppressionByYearData.data[2], type: 'column', color: "#60A6E5", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: '24 MONTHS', data: viralLoadSuppressionByYearData.data[3], type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
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
                        VIRAL SUPPRESSION BY YEAR OF ART START
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
