import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as CALHIVCurrentOnArtSelector from '../../../selectors/CT/OVC/CALHIVCurrentOnArt';
import * as CALHIVEligibleVLSelector from '../../../selectors/CT/OVC/CALHIVEligibleVL';
import * as CALHIVVLDoneSelector from '../../../selectors/CT/OVC/CALHIVVLDone';
import * as CALHIVVLSuppressedSelector from '../../../selectors/CT/OVC/CALHIVVLSuppressed';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OVCOverallVLUptakeAndSuppressionAmongCALHIV = () => {
    const [overAllVLUptakeAndSuppressionAmongCALHIV, setOverAllVLUptakeAndSuppressionAmongCALHIV] = useState({});
    const CALHIVCurrentOnArt = useSelector(CALHIVCurrentOnArtSelector.getCALHIVCurrentOnArt);
    const CALHIVEligibleVL = useSelector(CALHIVEligibleVLSelector.getCALHIVEligibleVL);
    const CALHIVVLDone = useSelector(CALHIVVLDoneSelector.getCALHIVVLDone);
    const CALHIVVLSuppressed = useSelector(CALHIVVLSuppressedSelector.getCALHIVVLSuppressed);

    const loadOverAllVLUptakeAndSuppressionAmongCALHIV = useCallback(async () => {
        setOverAllVLUptakeAndSuppressionAmongCALHIV({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            xAxis: [{ categories: ['TOTAL CALHIV CURRENT ON ART', 'ELIGIBLE FOR VL', 'VL DONE', 'VIRALLY SUPPRESSED'], crosshair: true }],
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
                    name: 'INTERRUPTION IN TREATMENT AMONG CALHIV PATIENTS',
                    data: [
                        {
                            name: 'CALHIV CURRENT ON ART',
                            y: CALHIVCurrentOnArt.CALHIVonART,
                            color: "#14084D",
                            text: CALHIVCurrentOnArt.CALHIVonART,
                            cText: 'CALHIV CURRENT ON ART: ' + CALHIVCurrentOnArt.CALHIVonART
                        },
                        {
                            name: 'ELIGIBLE FOR VL',
                            y: CALHIVEligibleVL.CALHIVEligible,
                            color: "#456DE4",
                            text: CALHIVEligibleVL.CALHIVEligible.toLocaleString('en') + ' (' + parseFloat(((CALHIVEligibleVL.CALHIVEligible/CALHIVCurrentOnArt.CALHIVonART)*100).toString()).toFixed(0) + '%)',
                            cText: 'ELIGIBLE FOR VL: ' + CALHIVEligibleVL.CALHIVEligible
                        },
                        {
                            name: 'VL DONE',
                            y: CALHIVVLDone.CALHIVVLDone,
                            color: "#EEA616",
                            text: CALHIVVLDone.CALHIVVLDone.toLocaleString('en') + ' (' + parseFloat(((CALHIVVLDone.CALHIVVLDone/CALHIVCurrentOnArt.CALHIVonART)*100).toString()).toFixed(0) + '%)',
                            cText: 'VL DONE: ' + CALHIVVLDone.CALHIVVLDone
                        },
                        {
                            name: 'VIRALLY SUPPRESSED',
                            y: CALHIVVLSuppressed.CALHIVVLSuppressed,
                            color: "#006800",
                            text: CALHIVVLSuppressed.CALHIVVLSuppressed.toLocaleString('en') + ' (' + parseFloat(((CALHIVVLSuppressed.CALHIVVLSuppressed/CALHIVVLDone.CALHIVVLDone)*100).toString()).toFixed(0) + '%)',
                            cText: 'VIRALLY SUPPRESSED: ' + CALHIVVLSuppressed.CALHIVVLSuppressed
                        }
                    ]
                },
            ]
        });
    }, [CALHIVCurrentOnArt, CALHIVEligibleVL, CALHIVVLDone, CALHIVVLSuppressed]);

    useEffect(() => {
        loadOverAllVLUptakeAndSuppressionAmongCALHIV();
    }, [loadOverAllVLUptakeAndSuppressionAmongCALHIV]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        OVERALL VL UPTAKE AND SUPPRESSION AMONG CALHIV PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={overAllVLUptakeAndSuppressionAmongCALHIV} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OVCOverallVLUptakeAndSuppressionAmongCALHIV;
