import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as timeFromDiagnosisToArtStartSelectors from '../../../selectors/CT/NewOnArt/timeFromDiagnosisToArtStart';

const TimeFromDiagnosisToArtStart = () => {
    const [timeFromDiagnosisToArtStartChart, setTimeFromDiagnosisToArtStartChart] = useState({});
    const timeFromDiagnosisToArtStartData = useSelector(timeFromDiagnosisToArtStartSelectors.getTimeFromDiagnosisToArtStart);

    const loadTimeFromDiagnosisToArtStart = useCallback(async () => {
        setTimeFromDiagnosisToArtStartChart({
            title: { text: '' },
            plotOptions: { column: { stacking: 'normal' } },
            xAxis: [{ categories: timeFromDiagnosisToArtStartData.periodGroups, title: { text: 'Year of Art Start' }, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients'} , min: 0, max: 100 }],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Same Day', data: timeFromDiagnosisToArtStartData.firstPeriodPercent, type: 'column', color: "#485969", tooltip: { valueSuffix: ' %' } },
                { name: '1-7 Days', data: timeFromDiagnosisToArtStartData.secondPeriodPercent, type: 'column', color: "#1AB394", tooltip: { valueSuffix: ' %' } },
                { name: '8-14 Days', data: timeFromDiagnosisToArtStartData.thirdPeriodPercent, type: 'column', color: "#60A6E5", tooltip: { valueSuffix: ' %' } },
                { name: '> 14 Days', data: timeFromDiagnosisToArtStartData.fourthPeriodPercent, type: 'column', color: "#E15759", tooltip: { valueSuffix: ' %' } },
            ]
        });
    }, [timeFromDiagnosisToArtStartData]);

    useEffect(() => {
        loadTimeFromDiagnosisToArtStart();
    }, [loadTimeFromDiagnosisToArtStart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TIME FROM DIAGNOSIS TO ART START AMONG NEWLY DIAGNOSED PATIENTS BY YEAR OF ART
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={timeFromDiagnosisToArtStartChart} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TimeFromDiagnosisToArtStart;
