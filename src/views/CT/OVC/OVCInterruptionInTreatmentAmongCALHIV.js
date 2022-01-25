import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as CALHIVCurrentOnArtSelector from '../../../selectors/CT/OVC/CALHIVCurrentOnArt';
import * as CALHIVOnIITSelector from '../../../selectors/CT/OVC/CALHIVOnIIT';
import * as CALHIVDEADSelector from '../../../selectors/CT/OVC/CALHIVDEAD';
import moment from 'moment';

const OVCInterruptionInTreatmentAmongCALHIV = () => {
    const [interruptionInTreatmentAmongCALHIV, setInterruptionInTreatmentAmongCALHIV] = useState({});
    const CALHIVCurrentOnArt = useSelector(CALHIVCurrentOnArtSelector.getCALHIVCurrentOnArt);
    const CALHIVOnIIT = useSelector(CALHIVOnIITSelector.getCALHIVOnIIT);
    const CALHIVDEAD = useSelector(CALHIVDEADSelector.getCALHIVDEAD);
    const monthYear = moment().startOf('month').subtract(1, 'month').format('MMM YYYY');

    const loadInterruptionInTreatmentAmongCALHIV = useCallback(async () => {
        setInterruptionInTreatmentAmongCALHIV({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            xAxis: [{ categories: ['CALHIV CURRENT ON ART IN ' + monthYear, 'IIT', 'DEAD'], crosshair: true }],
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
                            name: 'CALHIV CURRENT ON ART IN ' + monthYear,
                            y: CALHIVCurrentOnArt.CALHIVonART,
                            color: "#006800",
                            text: CALHIVCurrentOnArt.CALHIVonART,
                            cText: 'CALHIV CURRENT ON ART: ' + CALHIVCurrentOnArt.CALHIVonART
                        },
                        {
                            name: 'IIT',
                            y: CALHIVOnIIT.CALHIVIIT,
                            color: "#F26522",
                            text: CALHIVOnIIT.CALHIVIIT.toLocaleString('en') + ' (' + parseFloat(((CALHIVOnIIT.CALHIVIIT/CALHIVCurrentOnArt.CALHIVonART)*100).toString()).toFixed(0) + '%)',
                            cText: 'IIT: ' + CALHIVOnIIT.CALHIVIIT
                        },
                        {
                            name: 'DEAD',
                            y: CALHIVDEAD.CALHIVDead,
                            color: "#B50706",
                            text: CALHIVDEAD.CALHIVDead.toLocaleString('en') + ' (' + parseFloat(((CALHIVDEAD.CALHIVDead/CALHIVCurrentOnArt.CALHIVonART)*100).toString()).toFixed(0) + '%)',
                            cText: 'IIT: ' + CALHIVDEAD.CALHIVDead
                        }
                    ]
                },
            ]
        });
    }, [CALHIVCurrentOnArt, CALHIVOnIIT, CALHIVDEAD]);

    useEffect(() => {
        loadInterruptionInTreatmentAmongCALHIV();
    }, [loadInterruptionInTreatmentAmongCALHIV]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        INTERRUPTION IN TREATMENT AMONG CALHIV PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={interruptionInTreatmentAmongCALHIV} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OVCInterruptionInTreatmentAmongCALHIV;
