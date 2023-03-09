import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as ovcCurrentOnArtSelector from '../../../selectors/CT/OVC/ovcCurrentOnArt';
import * as ovcTotalOnMMDSelector from '../../../selectors/CT/OVC/ovcTotalOnMMD';

const OVCMMDUptakeAmongOvcPatients = () => {
    const [MMDUptakeAmongOvcPatients, setMMDUptakeAmongOvcPatients] = useState({});
    const ovcCurrentOnArt = useSelector(ovcCurrentOnArtSelector.getOvcCurrentOnArt);
    const ovcTotalOnMMD = useSelector(ovcTotalOnMMDSelector.getOvcTotalOnMMD);

    const loadMMDUptakeAmongOvcPatients = useCallback(async () => {
        setMMDUptakeAmongOvcPatients({
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
                            text: (ovcTotalOnMMD.ovcTotalOnMmd ? ovcTotalOnMMD.ovcTotalOnMmd.toLocaleString('en') : 0) + ' (' + parseFloat(((ovcTotalOnMMD?.ovcTotalOnMmd/ovcCurrentOnArt.OVConART)*100).toString()).toFixed(0) + '%)',
                            cText: 'OVC TOTAL ON MMD: ' + ovcTotalOnMMD.ovcTotalOnMmd
                        }
                    ]
                },
            ]
        });
    }, [ovcCurrentOnArt, ovcTotalOnMMD]);

    useEffect(() => {
        loadMMDUptakeAmongOvcPatients();
    }, [loadMMDUptakeAmongOvcPatients]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MMD UPTAKE AMONG OVC PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={MMDUptakeAmongOvcPatients} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OVCMMDUptakeAmongOvcPatients;
