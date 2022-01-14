import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcCurrentOnArtSelector from '../../../selectors/CT/OVC/ovcCurrentOnArt';
import * as ovcTotalOnMMDSelector from '../../../selectors/CT/OVC/ovcTotalOnMMD';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const OVCInterruptionInTreatmentAmongOVCPatients = () => {
    const [interruptionInTreatmentAmongOVC, setInterruptionInTreatmentAmongOVC] = useState({});
    const ovcCurrentOnArt = useSelector(ovcCurrentOnArtSelector.getOvcCurrentOnArt);
    const ovcTotalOnMMD = useSelector(ovcTotalOnMMDSelector.getOvcTotalOnMMD);

    const loadInterruptionInTreatmentAmongOVC = useCallback(async () => {
        /*setInterruptionInTreatmentAmongOVC({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            xAxis: [{ categories: ['OVC CURRENT ON ART', 'OVC TOTAL ON MMD'], crosshair: true }],
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
                    name: 'MMD UPTAKE AMONG OVC PATIENTS',
                    data: [
                        {
                            name: 'OVC CURRENT ON ART',
                            y: ovcCurrentOnArt.OVConART,
                            color: "#14084D",
                            text: ovcCurrentOnArt.OVConART,
                            cText: 'OVC CURRENT ON ART: ' + ovcCurrentOnArt.OVConART
                        },
                        {
                            name: 'OVC TOTAL ON MMD',
                            y: ovcTotalOnMMD.ovcTotalOnMmd,
                            color: "#14084D",
                            text: ovcTotalOnMMD.ovcTotalOnMmd.toLocaleString('en') + ' (' + parseFloat(((ovcTotalOnMMD.ovcTotalOnMmd/ovcCurrentOnArt.OVConART)*100).toString()).toFixed(0) + '%)',
                            cText: 'OVC TOTAL ON MMD: ' + ovcTotalOnMMD.ovcTotalOnMmd
                        }
                    ]
                },
            ]
        });*/
    }, [ovcCurrentOnArt, ovcTotalOnMMD]);

    useEffect(() => {
        loadInterruptionInTreatmentAmongOVC();
    }, [loadInterruptionInTreatmentAmongOVC]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        INTERRUPTION IN TREATMENT AMONG CALHIV PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={interruptionInTreatmentAmongOVC} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OVCInterruptionInTreatmentAmongOVCPatients;
