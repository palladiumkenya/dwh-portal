import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as CALHIVCurrentOnArtSelector from '../../../selectors/CT/OVC/CALHIVCurrentOnArt';
import * as CALHIVTotalOnMMDSelector from '../../../selectors/CT/OVC/CALHIVTotalOnMMD';

const OVCMMDUptakeAmongCALHIVPatients = () => {
    const [mmdUptakeAmongCALHIV, setMmdUptakeAmongCALHIV] = useState({});
    const CALHIVCurrentOnArt = useSelector(CALHIVCurrentOnArtSelector.getCALHIVCurrentOnArt);
    const CALHIVTotalOnMMD = useSelector(CALHIVTotalOnMMDSelector.getCALHIVTotalOnMMD);

    const loadMMDUptakeAmongCALHIV = useCallback(async () => {
        setMmdUptakeAmongCALHIV({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            xAxis: [{ categories: ['CALHIV CURRENT ON ART', 'CALHIV TOTAL ON MMD'], crosshair: true }],
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
                    name: 'DTG UPTAKE AMONG CALHIV PATIENTS',
                    data: [
                        {
                            name: 'CALHIV CURRENT ON ART',
                            y: CALHIVCurrentOnArt.CALHIVonART,
                            color: "#14084D",
                            text: CALHIVCurrentOnArt.CALHIVonART,
                            cText: 'CALHIV CURRENT ON ART: ' + CALHIVCurrentOnArt.CALHIVonART
                        },
                        {
                            name: 'CALHIV TOTAL ON MMD',
                            y: CALHIVTotalOnMMD.CALHIVonMMD,
                            color: "#14084D",
                            text: CALHIVTotalOnMMD.CALHIVonMMD.toLocaleString('en') + ' (' + parseFloat(((CALHIVTotalOnMMD.CALHIVonMMD/CALHIVCurrentOnArt.CALHIVonART)*100).toString()).toFixed(0) + '%)',
                            cText: 'CALHIV TOTAL ON MMD: ' + CALHIVTotalOnMMD.CALHIVonMMD
                        }
                    ]
                },
            ]
        });
    }, [CALHIVCurrentOnArt, CALHIVTotalOnMMD]);

    useEffect(() => {
        loadMMDUptakeAmongCALHIV();
    }, [loadMMDUptakeAmongCALHIV]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MMD UPTAKE AMONG CALHIV PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={mmdUptakeAmongCALHIV} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OVCMMDUptakeAmongCALHIVPatients;
