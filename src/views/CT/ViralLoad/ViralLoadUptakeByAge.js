import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as viralLoadUptakeByAgeSelectors from '../../../selectors/CT/ViralLoad/viralLoadUptakeByAge';

const ViralLoadUptakeByAge = () => {
    const [viralLoadUptakeByAge, setViralLoadUptakeByAge] = useState({});
    const viralLoadUptakeByAgeData = useSelector(viralLoadUptakeByAgeSelectors.getViralLoadUptakeByAge);

    const loadViralLoadUptakeByAge = useCallback(async () => {
        setViralLoadUptakeByAge({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            plotOptions: { column: { pointPadding: 0.2, borderWidth: 0, dataLabels: { enabled: true, formatter: function () { return '' + this.point.text; } } }},
            xAxis: [{ categories: viralLoadUptakeByAgeData.arrKeys, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: {
                formatter: function() {
                    let currentPoint = this,
                        currentSeries = currentPoint.series,
                        chart = currentSeries.chart,
                        cText = '';

                    chart.series.forEach(function(series) {
                        series.points.forEach(function(point) {
                            if (currentSeries.userOptions.name === series.userOptions.name && currentPoint.key === point.category) {
                                cText = point.cText;
                            }
                        })
                    });

                    return cText;
                }
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                {
                    name: 'VL UPTAKE AMONG CURRENT ON ART PATIENTS BY AGE GROUP',
                    data: [
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[0],
                            y: viralLoadUptakeByAgeData.groupPercentageData[0],
                            text: viralLoadUptakeByAgeData.groupPercentageData[0].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[0].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[1].percentage
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[1],
                            y: viralLoadUptakeByAgeData.groupPercentageData[1],
                            text: viralLoadUptakeByAgeData.groupPercentageData[1].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[2].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[3].percentage
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[2],
                            y: viralLoadUptakeByAgeData.groupPercentageData[2],
                            text: viralLoadUptakeByAgeData.groupPercentageData[2].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[4].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[5].percentage
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[3],
                            y: viralLoadUptakeByAgeData.groupPercentageData[3],
                            text: viralLoadUptakeByAgeData.groupPercentageData[3].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[6].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[7].percentage
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[4],
                            y: viralLoadUptakeByAgeData.groupPercentageData[4],
                            text: viralLoadUptakeByAgeData.groupPercentageData[4].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[8].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[9].percentage
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[5],
                            y: viralLoadUptakeByAgeData.groupPercentageData[5],
                            text: viralLoadUptakeByAgeData.groupPercentageData[5].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[10].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[11].percentage
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[6],
                            y: viralLoadUptakeByAgeData.groupPercentageData[6],
                            text: viralLoadUptakeByAgeData.groupPercentageData[6].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[12].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[13].percentage
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[7],
                            y: viralLoadUptakeByAgeData.groupPercentageData[7],
                            text: viralLoadUptakeByAgeData.groupPercentageData[7].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[14].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[15].percentage
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[8],
                            y: viralLoadUptakeByAgeData.groupPercentageData[8],
                            text: viralLoadUptakeByAgeData.groupPercentageData[8].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[16].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[17].percentage
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[9],
                            y: viralLoadUptakeByAgeData.groupPercentageData[9],
                            text: viralLoadUptakeByAgeData.groupPercentageData[9].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[18].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[19].percentage
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[10],
                            y: viralLoadUptakeByAgeData.groupPercentageData[10],
                            text: viralLoadUptakeByAgeData.groupPercentageData[10].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[20].percentage + ' <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[21].percentage
                        }
                    ],
                    color: "#485969",
                }
            ]
        });
    }, [viralLoadUptakeByAgeData]);

    useEffect(() => {
        loadViralLoadUptakeByAge();
    }, [loadViralLoadUptakeByAge]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL UPTAKE AMONG CURRENT ON ART PATIENTS BY AGE GROUP
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={viralLoadUptakeByAge} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadUptakeByAge;
