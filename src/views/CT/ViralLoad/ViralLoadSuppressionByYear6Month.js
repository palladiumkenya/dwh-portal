import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from 'lodash';
import * as viralLoad6MonthSuppressionByYearOfArtStart
    from '../../../selectors/CT/ViralLoad/viralLoad6MonthSuppressionByYearOfArtStart';

const ViralLoadSuppressionByYear6Month = () => {
    const [viralLoadSuppressionByYear6Month, setViralLoadSuppressionByYear6Month] = useState({});
    const viralLoadSuppressionByYearData = useSelector(viralLoad6MonthSuppressionByYearOfArtStart.getViralLoad6MonthSuppressionByYearOfArtStart);

    const loadViralLoadSuppressionByYear6Month = useCallback(async () => {
        setViralLoadSuppressionByYear6Month({
            title: { text: '' },
            xAxis: [{ categories: viralLoadSuppressionByYearData.data.map(obj => obj.year), crosshair: true, title: { text: 'Year of Start' } }],
            yAxis: [{ title: { text: 'Percentage of Patients' }, labels: { format: '{value} %' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none', format: '{y}%' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Percentage of Patients', data: viralLoadSuppressionByYearData.data, type: 'column', color: "#485969", tooltip: { valueSuffix: ' % ({point.text})'} },
            ]
        });
    }, [viralLoadSuppressionByYearData]);

    useEffect(() => {
        loadViralLoadSuppressionByYear6Month();
    }, [loadViralLoadSuppressionByYear6Month]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        6 MONTH VIRAL SUPPRESSION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadSuppressionByYear6Month} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadSuppressionByYear6Month;
