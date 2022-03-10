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
            xAxis: [{ categories: viralLoadUptakeByAgeData.arrKeys.map(name=> name.toUpperCase()), crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients'.toUpperCase() }, labels: { format: '{value} %' }}],
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
                            text: viralLoadUptakeByAgeData.groupPercentageData[0].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[0].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[0].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[0].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[1].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[1].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[1].eligible +')'
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[1],
                            y: viralLoadUptakeByAgeData.groupPercentageData[1],
                            text: viralLoadUptakeByAgeData.groupPercentageData[1].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[2].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[2].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[2].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[3].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[3].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[3].eligible +')'
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[2],
                            y: viralLoadUptakeByAgeData.groupPercentageData[2],
                            text: viralLoadUptakeByAgeData.groupPercentageData[2].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[4].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[4].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[4].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[5].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[5].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[5].eligible +')'
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[3],
                            y: viralLoadUptakeByAgeData.groupPercentageData[3],
                            text: viralLoadUptakeByAgeData.groupPercentageData[3].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[6].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[6].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[6].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[7].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[7].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[7].eligible +')'
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[4],
                            y: viralLoadUptakeByAgeData.groupPercentageData[4],
                            text: viralLoadUptakeByAgeData.groupPercentageData[4].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[8].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[8].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[8].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[9].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[9].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[9].eligible +')'
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[5],
                            y: viralLoadUptakeByAgeData.groupPercentageData[5],
                            text: viralLoadUptakeByAgeData.groupPercentageData[5].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[10].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[10].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[10].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[11].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[11].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[11].eligible +')'
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[6],
                            y: viralLoadUptakeByAgeData.groupPercentageData[6],
                            text: viralLoadUptakeByAgeData.groupPercentageData[6].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[12].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[12].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[12].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[13].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[13].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[13].eligible +')'
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[7],
                            y: viralLoadUptakeByAgeData.groupPercentageData[7],
                            text: viralLoadUptakeByAgeData.groupPercentageData[7].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[14].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[14].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[14].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[15].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[15].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[15].eligible +')'
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[8],
                            y: viralLoadUptakeByAgeData.groupPercentageData[8],
                            text: viralLoadUptakeByAgeData.groupPercentageData[8].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[16].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[16].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[16].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[17].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[17].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[17].eligible +')'
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[9],
                            y: viralLoadUptakeByAgeData.groupPercentageData[9],
                            text: viralLoadUptakeByAgeData.groupPercentageData[9].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[18].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[18].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[18].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[19].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[19].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[19].eligible +')'
                        },
                        {
                            name: viralLoadUptakeByAgeData.arrKeys[10],
                            y: viralLoadUptakeByAgeData.groupPercentageData[10],
                            text: viralLoadUptakeByAgeData.groupPercentageData[10].toLocaleString('en') + '%',
                            cText: 'Male: ' + viralLoadUptakeByAgeData.arrayData[20].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[20].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[20].eligible +') <br /> Female: ' + viralLoadUptakeByAgeData.arrayData[21].percentage + '% (VLDone:' + viralLoadUptakeByAgeData.arrayData[21].vlDone  +', Eligible: '+ viralLoadUptakeByAgeData.arrayData[21].eligible +')'
                        }
                    ],
                    color: "#142459",
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
