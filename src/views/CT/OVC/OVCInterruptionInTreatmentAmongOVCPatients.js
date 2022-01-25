import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as ovcCurrentOnArtSelector from '../../../selectors/CT/OVC/ovcCurrentOnArt';
import * as ovcIITSelector from '../../../selectors/CT/OVC/ovcIIT';
import * as ovcDEADSelector from '../../../selectors/CT/OVC/ovcDEAD';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment';

const OVCInterruptionInTreatmentAmongOVCPatients = () => {
    const [interruptionInTreatmentAmongOVC, setInterruptionInTreatmentAmongOVC] = useState({});
    const ovcCurrentOnArt = useSelector(ovcCurrentOnArtSelector.getOvcCurrentOnArt);
    const ovcIIT = useSelector(ovcIITSelector.getOVCIIT);
    const ovcDEAD = useSelector(ovcDEADSelector.getOVCDEAD);
    const monthYear = moment().startOf('month').subtract(1, 'month').format('MMM YYYY');

    const loadInterruptionInTreatmentAmongOVC = useCallback(async () => {
        setInterruptionInTreatmentAmongOVC({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            xAxis: [{ categories: ['OVC CURRENT ON ART IN ' + monthYear, 'IIT', 'DEAD'], crosshair: true }],
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
                    name: 'INTERRUPTION IN TREATMENT AMONG OVC PATIENTS',
                    data: [
                        {
                            name: 'OVC CURRENT ON ART IN ' + monthYear,
                            y: ovcCurrentOnArt.OVConART,
                            color: "#006800",
                            text: ovcCurrentOnArt.OVConART,
                            cText: 'OVC CURRENT ON ART: ' + ovcCurrentOnArt.OVConART
                        },
                        {
                            name: 'IIT',
                            y: ovcIIT.OVCIIT,
                            color: "#F26522",
                            text: ovcIIT.OVCIIT.toLocaleString('en') + ' (' + parseFloat(((ovcIIT.OVCIIT/ovcCurrentOnArt.OVConART)*100).toString()).toFixed(0) + '%)',
                            cText: 'IIT: ' + ovcIIT.OVCIIT
                        },
                        {
                            name: 'DEAD',
                            y: ovcDEAD.OVCDead,
                            color: "#B50706",
                            text: ovcDEAD.OVCDead.toLocaleString('en') + ' (' + parseFloat(((ovcDEAD.OVCDead/ovcCurrentOnArt.OVConART)*100).toString()).toFixed(0) + '%)',
                            cText: 'DEAD: ' + ovcDEAD.OVCDead
                        }
                    ]
                },
            ]
        });
    }, [ovcCurrentOnArt, ovcIIT, ovcDEAD]);

    useEffect(() => {
        loadInterruptionInTreatmentAmongOVC();
    }, [loadInterruptionInTreatmentAmongOVC]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        INTERRUPTION IN TREATMENT AMONG OVC PATIENTS
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
