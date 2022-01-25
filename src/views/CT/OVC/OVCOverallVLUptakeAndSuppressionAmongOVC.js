import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcCurrentOnArtSelector from '../../../selectors/CT/OVC/ovcCurrentOnArt';
import * as ovcEligibleVLSelector from '../../../selectors/CT/OVC/ovcEligibleVL';
import * as ovcVLDoneSelector from '../../../selectors/CT/OVC/ovcVLDone';
import * as ovcVLSuppressedSelector from '../../../selectors/CT/OVC/ovcVLSuppressed';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OVCOverallVLUptakeAndSuppressionAmongOVC = () => {
    const [overAllVLUptakeAndSuppressionAmongOVC, setOverAllVLUptakeAndSuppressionAmongOVC] = useState({});
    const ovcCurrentOnArt = useSelector(ovcCurrentOnArtSelector.getOvcCurrentOnArt);
    const ovcEligibleVL = useSelector(ovcEligibleVLSelector.getOVCEligibleVL);
    const ovcVLDone = useSelector(ovcVLDoneSelector.getOVCVLDone);
    const ovcVLSuppressed = useSelector(ovcVLSuppressedSelector.getOVCVLSuppressed);

    const loadOverAllVLUptakeAndSuppressionAmongOVC = useCallback(async () => {
        setOverAllVLUptakeAndSuppressionAmongOVC({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            xAxis: [{ categories: ['TOTAL OVC CURRENT ON ART', 'ELIGIBLE FOR VL', 'VL DONE', 'VIRALLY SUPPRESSED'], crosshair: true }],
            yAxis: [
                { title: { text: 'Number of Patients' } }
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
                        })
                    });

                    return cText;
                }
            },
            plotOptions: { column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '' + this.point.text;
                        }
                    }
                }},
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80, enabled: false },
            series: [
                {
                    name: 'OVERALL VL UPTAKE AND SUPPRESSION AMONG OVC PATIENTS',
                    data: [
                        {
                            name: 'TOTAL OVC CURRENT ON ART',
                            y: ovcCurrentOnArt.OVConART,
                            color: "#14084D",
                            text: ovcCurrentOnArt.OVConART,
                            cText: 'TOTAL OVC CURRENT ON ART: ' + ovcCurrentOnArt.OVConART
                        },
                        {
                            name: 'ELIGIBLE FOR VL',
                            y: ovcEligibleVL.OVCEligible,
                            color: "#456DE4",
                            text: ovcEligibleVL.OVCEligible ? ovcEligibleVL.OVCEligible.toLocaleString('en') + ' (' + parseFloat(((ovcEligibleVL.OVCEligible/ovcCurrentOnArt.OVConART)*100).toString()).toFixed(0) + '%)' : null,
                            cText: 'ELIGIBLE FOR VL: ' + ovcEligibleVL.OVCEligible
                        },
                        {
                            name: 'VL DONE',
                            y: ovcVLDone.OVCVLDone,
                            color: "#EEA616",
                            text: ovcVLDone.OVCVLDone ? ovcVLDone.OVCVLDone.toLocaleString('en') + ' (' + parseFloat(((ovcVLDone.OVCVLDone/ovcCurrentOnArt.OVConART)*100).toString()).toFixed(0) + '%)' : null,
                            cText: 'VL DONE: ' + ovcVLDone.OVCVLDone
                        },
                        {
                            name: 'VIRALLY SUPPRESSED',
                            y: ovcVLSuppressed.OVCVLSuppressed,
                            color: "#006800",
                            text: ovcVLSuppressed.OVCVLSuppressed ? ovcVLSuppressed.OVCVLSuppressed.toLocaleString('en') + ' (' + parseFloat(((ovcVLSuppressed.OVCVLSuppressed/ovcVLDone.OVCVLDone)*100).toString()).toFixed(0) + '%)' : null,
                            cText: 'VIRALLY SUPPRESSED: ' + ovcVLSuppressed.OVCVLSuppressed
                        }
                    ]
                },
            ]
        });
    }, [ovcCurrentOnArt, ovcEligibleVL, ovcVLDone, ovcVLSuppressed]);

    useEffect(() => {
        loadOverAllVLUptakeAndSuppressionAmongOVC();
    }, [loadOverAllVLUptakeAndSuppressionAmongOVC]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        OVERALL VL UPTAKE AND SUPPRESSION AMONG OVC PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={overAllVLUptakeAndSuppressionAmongOVC} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OVCOverallVLUptakeAndSuppressionAmongOVC;

