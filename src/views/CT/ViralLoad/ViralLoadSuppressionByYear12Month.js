import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoad12MonthSuppressionByYearOfArtStart
    from '../../../selectors/CT/ViralLoad/viralLoad12MonthSuppressionByYearOfArtStart';

const ViralLoadSuppressionByYear12Month = () => {
    const [viralLoadSuppressionByYear12Month, setViralLoadSuppressionByYear12Month] = useState({});
    const viralLoadSuppressionByYearData = useSelector(viralLoad12MonthSuppressionByYearOfArtStart.getViralLoad12MonthSuppressionByYearOfArtStart);

    const loadViralLoadSuppressionByYear12Month = useCallback(async () => {
        setViralLoadSuppressionByYear12Month({
            title: { text: '' },
            xAxis: [{ categories: viralLoadSuppressionByYearData.data.map(obj => obj.year), crosshair: true, title: { text: 'Year of Start' } }],
            yAxis: [{ title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y}%' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: viralLoadSuppressionByYearData.data, type: 'column', color: "#142459", tooltip: { valueSuffix: ' % ({point.text})'} },
            ]
        });
    }, [viralLoadSuppressionByYearData]);

    useEffect(() => {
        loadViralLoadSuppressionByYear12Month();
    }, [loadViralLoadSuppressionByYear12Month]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        12 MONTH VIRAL SUPPRESSION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadSuppressionByYear12Month} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadSuppressionByYear12Month;
