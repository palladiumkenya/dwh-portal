import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as viralLoadOverallUptakeSuppressionBySexSelectors
    from '../../../selectors/CT/ViralLoad/viralLoadOverallUptakeSuppressionBySex';
import * as viralLoadOverallUptakeSuppressionBySexVlDoneSelectors
    from '../../../selectors/CT/ViralLoad/viralLoadOverallUptakeSuppressionBySexVlDone';
import * as getViralLoadOverallUptakeSuppressionLessInteseSelector
    from '../../../selectors/CT/ViralLoad/viralLoadOverallUptakeSuppressionReferredLessIntense';

const ViralLoadOverallUptakeAndSuppressionBySex = () => {
    const [vlOverallUptakeAndSuppression, setViralLoadOverallUptakeAndSuppressionBySex] = useState({});
    const viralLoadOverallUptakeSuppressionBySexData = useSelector(viralLoadOverallUptakeSuppressionBySexSelectors.getViralLoadOverallUptakeSuppressionBySex);
    const viralLoadOverallUptakeSuppressionBySexVlDoneData = useSelector(viralLoadOverallUptakeSuppressionBySexVlDoneSelectors.getViralLoadOverallUptakeSuppressionBySexVlDone);
    const viralLoadOverallUptakeSuppressionReferredLessIntenseData = useSelector(getViralLoadOverallUptakeSuppressionLessInteseSelector.getViralLoadOverallUptakeSuppressionReferredLessIntense);

    const loadViralLoadOverallUptakeAndSuppressionBySex = useCallback(async () => {
        let viralLoadCascade = [];
        viralLoadCascade = viralLoadOverallUptakeSuppressionBySexData.data[0].map(function(num, idx) {
            return num + viralLoadOverallUptakeSuppressionBySexData.data[1][idx];
        });
        let viralLoadSupCascade = viralLoadOverallUptakeSuppressionBySexVlDoneData.data.map((num) => {
            return num.Num;
        });

        setViralLoadOverallUptakeAndSuppressionBySex({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            xAxis: [{
                categories: ['NUMBER OF PLHIV ON ART', 'NUMBER OF PLHIV THAT REQUIRE AT LEAST ONE ROUTINE ANNUAL VL TEST',
                    'NUMBER OF PLHIV ON ART WHO RECEIVED A VL TEST', 'NUMBER OF PLHIV WHO ARE VIEALLY SUPPRESSED',
                    'NUMBER OF VIRALLY SUPPRESSED PLHIV REFERRED TO LESS INTENSE MODEL OF CARE'],
                crosshair: true
            }],
            yAxis: [
                { title: { text: 'Number of Patients'.toUpperCase() } }
            ],
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
                        });
                    });

                    return cText;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return '' + this.point.text;
                        }
                    }
                }
            },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, enabled: false },
            series: [
                {
                    name: 'VIRAL LOAD CASCADE',
                    data: [
                        {
                            name: viralLoadOverallUptakeSuppressionBySexData.vlCategoryNames[0],
                            y: viralLoadCascade[0],
                            color: '#1dad87',
                            text: viralLoadCascade[0].toLocaleString('en'),
                            cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][0] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][0]
                        },
                        {
                            name: viralLoadOverallUptakeSuppressionBySexData.vlCategoryNames[1],
                            y: viralLoadCascade[1], color: '#142459',
                            text: viralLoadCascade[1].toLocaleString('en') + ' (' + parseFloat(((viralLoadCascade[1] / viralLoadCascade[0]) * 100).toString()).toFixed(0) + '%)',
                            cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][1] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][1]
                        },
                        {
                            name: viralLoadOverallUptakeSuppressionBySexData.vlCategoryNames[2],
                            y: viralLoadCascade[2], color: '#655788',
                            text: viralLoadCascade[2].toLocaleString('en') + ' (' + parseFloat(((viralLoadCascade[2] / viralLoadCascade[1]) * 100).toString()).toFixed(0) + '%)',
                            cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][2] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][2]
                        },
                        // {
                        //     name: viralLoadOverallUptakeSuppressionBySexData.vlCategoryNames[3],
                        //     y: viralLoadCascade[3], color: '#142459',
                        //     text: viralLoadCascade[3].toLocaleString('en') + ' (' + parseFloat(((viralLoadCascade[3] / viralLoadCascade[2]) * 100).toString()).toFixed(0) + '%)',
                        //     cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][3] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][3]
                        // },
                        {
                            name: viralLoadOverallUptakeSuppressionBySexVlDoneData.vlCategories[0],
                            y: viralLoadSupCascade[0], color: '#f88149',
                            text: viralLoadSupCascade[0].toLocaleString('en') + ' (' + parseFloat(((viralLoadSupCascade[0] / viralLoadSupCascade.reduce((a, b) => a + b, 0)) * 100).toString()).toFixed(0) + '%)',
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][3] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][3]
                        },
                        {
                            name: viralLoadOverallUptakeSuppressionBySexVlDoneData.vlCategories[0],
                            y: viralLoadOverallUptakeSuppressionReferredLessIntenseData.data, color: '#1dad87',
                            text: viralLoadOverallUptakeSuppressionReferredLessIntenseData.data.toLocaleString('en') + ' (' + parseFloat(((viralLoadSupCascade[0] / viralLoadSupCascade.reduce((a, b) => a + b, 0)) * 100).toString()).toFixed(0) + '%)',
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][3] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][3]
                        }
                    ]
                },
                {
                    name: 'VIRAL LOAD CASCADE',
                    data: [
                        {},
                        {},
                        {},
                        {
                            name: viralLoadOverallUptakeSuppressionBySexVlDoneData.vlCategories[0],
                            y: viralLoadSupCascade[1], color: 'blue',
                            text: viralLoadSupCascade[1].toLocaleString('en') + ' (' + parseFloat(((viralLoadSupCascade[1] / viralLoadSupCascade.reduce((a, b) => a + b, 0)) * 100).toString()).toFixed(0) + '%)'
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][3] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][3]
                        }
                    ]
                },
                {
                    name: 'VIRAL LOAD CASCADE',
                    data: [
                        {},
                        {},
                        {},
                        {
                            name: viralLoadOverallUptakeSuppressionBySexVlDoneData.vlCategories[0],
                            y: viralLoadSupCascade[2], color: '#1dad87',
                            text: viralLoadSupCascade[2].toLocaleString('en') + ' (' + parseFloat(((viralLoadSupCascade[2] / viralLoadSupCascade.reduce((a, b) => a + b, 0)) * 100).toString()).toFixed(0) + '%)',
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][3] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][3]
                        }
                    ]
                }
            ]
        });
    }, [viralLoadOverallUptakeSuppressionBySexData, viralLoadOverallUptakeSuppressionBySexVlDoneData, viralLoadOverallUptakeSuppressionReferredLessIntenseData]);

    useEffect(() => {
        loadViralLoadOverallUptakeAndSuppressionBySex();
    }, [loadViralLoadOverallUptakeAndSuppressionBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        OVERALL VL UPTAKE AND SUPPRESSION AMONG CURRENT ON ART PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={vlOverallUptakeAndSuppression}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ViralLoadOverallUptakeAndSuppressionBySex;
