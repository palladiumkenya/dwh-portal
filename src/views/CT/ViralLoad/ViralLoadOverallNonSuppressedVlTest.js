import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as viralLoadOverallUptakeGt1000
    from '../../../selectors/CT/ViralLoad/viralLoadOverallUptakeGt1000Copies';


const ViralLoadOverallNonSuppressedVlTest = () => {
    const [vlOverallUptakeAndSuppression, setViralLoadOverallUptakeAndSuppressionBySex] = useState({});
    const viralLoadUptakeGt1000Copies = useSelector(viralLoadOverallUptakeGt1000.getViralLoadOverallUptakeGt1000CopiesData).data;
    const viralLoadUptakeGt1000CopiesEac = useSelector(viralLoadOverallUptakeGt1000.getViralLoadOverallUptakeGt1000CopiesEacData).data;
    const viralLoadUptakeGt1000CopiesRecFollowTestAll = useSelector(viralLoadOverallUptakeGt1000.getViralLoadOverallUptakeGt1000CopiesReceivedFollowTestAllData).data;
    const viralLoadUptakeGt1000CopiesRecFollowTest = useSelector(viralLoadOverallUptakeGt1000.getViralLoadOverallUptakeGt1000CopiesReceivedFollowTestData).data;
    const viralLoadOverallNumberGt1000CopiesSecondlineRegimentData = useSelector(viralLoadOverallUptakeGt1000.getViralLoadOverallNumberGt1000CopiesSecondlineRegimentData).data;

    const loadViralLoadOverallUptakeAndSuppressionBySex = useCallback(async () => {
        let totalFollowTest = 0;
        viralLoadUptakeGt1000CopiesRecFollowTest.forEach(element => {
            totalFollowTest += element.Num;
        });

        setViralLoadOverallUptakeAndSuppressionBySex({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            xAxis: [{
                categories: ['NUMBER OF PLHIV ON ART WITH VL > 1000 COPIES/ML', 'NUMBER OF PLHIV ON ART WITH VL > 1000 COPIES/ML WHO RECEIVED EAC',
                    'NUMBER OF PLHIV ON ART WITH VL > 1000 COPIES/ML WHO RECEIVED FOLLOW UP VL TESTS', 'NUMBER OF PLHIV ON ART WITH VL > 1000 COPIES/ML WHO RECEIVED FOLLOW UP VL TESTS',
                    'NUMBER WITH FOLLOW UP VL TEST AT VL > 1000 COPIES/ML SWITCHED TO SECOND LINE REGIMENT'],
                crosshair: true
            }],
            yAxis: [
                { title: { text: 'Number of Patients'.toUpperCase() } }
            ],
            tooltip: {
                formatter: function() {
                    let thisPoint = this.point,
                        allSeries = this.series.chart.series,
                        stackName = this.series.userOptions.stack,
                        thisIndex = thisPoint.index,
                        returnString = '<b>' + this.x + '</b><br/>';

                    allSeries.forEach(function(ser) {
                        if (ser.options.stack === thisPoint.series.options.stack) {
                            if (ser.data[thisIndex].y !== null) {
                                returnString += ser.points[thisIndex].name + ': ' + ser.points[thisIndex].y + '<br/>';
                                // returnString += '<span style="color:' + ser.color + '">' + ser.name + '</span>: ' + ser.data[thisIndex].y + '<br/>';
                            }

                        }
                    });

                    returnString += 'Total: ' + this.point.stackTotal;

                    return returnString;
                },
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        crop: false,
                        overflow: 'none',
                        useHTML: true,
                        formatter: function() {
                            return '<div style="text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black; text-align: center; color: #FFFFFF">' + this.point.text + '</div>';
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
                            name: 'NUMBER OF PLHIV ON ART WITH VL > 1000 COPIES/ML',
                            y: viralLoadUptakeGt1000Copies,
                            color: '#bb1414',
                            text: viralLoadUptakeGt1000Copies.toLocaleString('en'),
                            cText: viralLoadUptakeGt1000Copies.toLocaleString('en') + ' Patients'
                        },
                        {
                            name: 'EAC 3',
                            y: viralLoadUptakeGt1000CopiesEac.EACVisitDate_3,
                            color: '#1c943e',
                            text: 'EAC 3<br/>' + viralLoadUptakeGt1000CopiesEac.EACVisitDate_3.toLocaleString('en') + ' (' + parseFloat(((viralLoadUptakeGt1000CopiesEac.EACVisitDate_3 / Object.values(viralLoadUptakeGt1000CopiesEac).reduce((a, b) => a + b, 0)) * 100).toString()).toFixed(0) + '%)'
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][1] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][1]
                        },
                        {
                            name: 'NUMBER OF PLHIV ON ART WITH VL > 1000 COPIES/ML WHO RECEIVED FOLLOW UP VL TESTS',
                            y: viralLoadUptakeGt1000CopiesRecFollowTestAll,
                            color: '#fad53f',
                            text: viralLoadUptakeGt1000CopiesRecFollowTestAll.toLocaleString('en') // + ' (' + parseFloat(((viralLoadCascade[2] / viralLoadCascade[1]) * 100).toString()).toFixed(0) + '%)',
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][2] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][2]
                        },
                        {
                            name: 'NUMBER VIRALLY SUPPRESSED ON FOLLOW UP VL TEST',
                            y: viralLoadUptakeGt1000CopiesRecFollowTest[0].Num,
                            color: '#1c943e',
                            text: '  NUMBER VIRALLY SUPPRESSED <br/> ON FOLLOW UP VL TEST ' + viralLoadUptakeGt1000CopiesRecFollowTest[0].Num.toLocaleString('en') + ' (' + parseFloat(((viralLoadUptakeGt1000CopiesRecFollowTest[0].Num / totalFollowTest) * 100).toString()).toFixed(0) + '%)'
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][3] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][3]
                        },
                        // TODO:: Last bar of the chart
                        {
                            name: 'NUMBER WITH FOLLOW UP VL TEST AT VL > 1000 COPIES/ML SWITCHED TO SECOND LINE REGIMENT',
                            y: viralLoadOverallNumberGt1000CopiesSecondlineRegimentData,
                            color: '#142459',
                            text: viralLoadOverallNumberGt1000CopiesSecondlineRegimentData.toLocaleString('en') //+ ' (' + parseFloat(((viralLoadSupCascade[0] / viralLoadSupCascade.reduce((a, b) => a + b, 0)) * 100).toString()).toFixed(0) + '%)',
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][3] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][3]
                        }
                    ]
                },
                {
                    name: 'VIRAL LOAD CASCADE',
                    data: [
                        null,
                        {
                            name: 'EAC 2',
                            y: viralLoadUptakeGt1000CopiesEac.EACVisitDate_2,
                            color: '#e88134',
                            text: 'EAC 2<br/>' + viralLoadUptakeGt1000CopiesEac.EACVisitDate_2.toLocaleString('en') + ' (' + parseFloat(((viralLoadUptakeGt1000CopiesEac.EACVisitDate_2 / Object.values(viralLoadUptakeGt1000CopiesEac).reduce((a, b) => a + b, 0)) * 100).toString()).toFixed(0) + '%)'
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][1] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][1]
                        },
                        null,
                        {
                            name: 'NUMBER WHO HAD > 1000 COPIES/ML ON A FOLLOW UP TEST',
                            y: viralLoadUptakeGt1000CopiesRecFollowTest[1].Num,
                            color: '#bb1414',
                            text: 'NUMBER WHO HAD > 1000 COPIES/ML <br/> ON A FOLLOW UP TEST ' + viralLoadUptakeGt1000CopiesRecFollowTest[1].Num.toLocaleString('en') + ' (' + parseFloat(((viralLoadUptakeGt1000CopiesRecFollowTest[1].Num / totalFollowTest) * 100).toString()).toFixed(0) + '%)'
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][3] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][3]
                        },
                        null
                    ]
                },
                {
                    name: 'VIRAL LOAD CASCADE',
                    data: [
                        null,
                        {
                            name: 'EAC 1',
                            y: viralLoadUptakeGt1000CopiesEac.EACVisitDate_1,
                            color: '#bb1414',
                            text: 'EAC 1<br/>' + viralLoadUptakeGt1000CopiesEac.EACVisitDate_1.toLocaleString('en') + ' (' + parseFloat(((viralLoadUptakeGt1000CopiesEac.EACVisitDate_1 / Object.values(viralLoadUptakeGt1000CopiesEac).reduce((a, b) => a + b, 0)) * 100).toString()).toFixed(0) + '%)'
                            // cText: 'Male: ' + viralLoadOverallUptakeSuppressionBySexData.data[0][1] + ' <br /> Female: ' + viralLoadOverallUptakeSuppressionBySexData.data[1][1]
                        },
                        null,
                        null,
                        null
                    ]
                }
            ]
        });
    }, [viralLoadUptakeGt1000CopiesRecFollowTest, viralLoadUptakeGt1000Copies, viralLoadUptakeGt1000CopiesEac, viralLoadUptakeGt1000CopiesRecFollowTestAll, viralLoadOverallNumberGt1000CopiesSecondlineRegimentData]);

    useEffect(() => {
        loadViralLoadOverallUptakeAndSuppressionBySex();
    }, [loadViralLoadOverallUptakeAndSuppressionBySex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        VL CASCADE FOR PATIENTS WITH A NON-SUPPRESSED VL TEST RESULT (VL > 1000 copies/ml)
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

export default ViralLoadOverallNonSuppressedVlTest;
