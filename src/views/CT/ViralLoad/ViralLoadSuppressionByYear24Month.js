import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadSuppressionByYearSelectors from '../../../selectors/CT/ViralLoad/viralLoadSuppressionByYear';

const ViralLoadSuppressionByYear24Month = () => {
    const [viralLoadSuppressionByYear24Month, setViralLoadSuppressionByYear24Month] = useState({});
    const viralLoadSuppressionByYearData = useSelector(viralLoadSuppressionByYearSelectors.getViralLoadSuppressionByYear);

    const loadViralLoadSuppressionByYear24Month = useCallback(async () => {
        setViralLoadSuppressionByYear24Month({
            title: { text: '' },
            xAxis: [{ categories: viralLoadSuppressionByYearData.yearCategories, crosshair: true, title: { text: 'Year of Start' } }],
            yAxis: [{ title: { text: 'Number of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number of Patients', data: viralLoadSuppressionByYearData.data[2], type: 'column', color: "#485969" },
            ]
        });
    }, [viralLoadSuppressionByYearData]);

    useEffect(() => {
        loadViralLoadSuppressionByYear24Month();
    }, [loadViralLoadSuppressionByYear24Month]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        24 MONTH VIRAL SUPPRESSION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadSuppressionByYear24Month} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadSuppressionByYear24Month;
