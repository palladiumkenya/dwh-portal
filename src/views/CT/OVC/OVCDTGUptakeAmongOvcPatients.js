import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as ovcCurrentOnArtSelector from '../../../selectors/CT/OVC/ovcCurrentOnArt';
import * as ovcTotalOnTldSelector from '../../../selectors/CT/OVC/ovcTotalOnTld';
import { useSelector } from 'react-redux';

const OVCDTGUptakeAmongOvcPatients = () => {
    const [DTGUptakeAmongOvcPatients, setDTGUptakeAmongOvcPatients] = useState({});
    const ovcCurrentOnArt = useSelector(ovcCurrentOnArtSelector.getOvcCurrentOnArt);
    const ovcTotalOnTld = useSelector(ovcTotalOnTldSelector.getOvcTotalOnTld);

    const loadDTGUptakeAmongOvcPatients = useCallback(async () => {
        setDTGUptakeAmongOvcPatients({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            xAxis: [{ categories: ['OVC CURRENT ON ART', 'OVC TOTAL ON TLD'], crosshair: true }],
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
                    name: 'DTG UPTAKE AMONG OVC PATIENTS',
                    data: [
                        {
                            name: 'OVC CURRENT ON ART',
                            y: ovcCurrentOnArt.OVConART,
                            color: "#14084D",
                            text: ovcCurrentOnArt.OVConART,
                            cText: 'OVC CURRENT ON ART: ' + ovcCurrentOnArt.OVConART
                        },
                        {
                            name: 'OVC TOTAL ON TLD',
                            y: ovcTotalOnTld.OVConDTG,
                            color: "#14084D",
                            text: ovcTotalOnTld.OVConDTG?.toLocaleString('en') + ' (' + parseFloat(((ovcTotalOnTld.OVConDTG/ovcCurrentOnArt.OVConART)*100).toString()).toFixed(0) + '%)',
                            cText: 'OVC TOTAL ON TLD: ' + ovcTotalOnTld.OVConDTG
                        }
                    ]
                },
            ]
        });
    }, [ovcCurrentOnArt, ovcTotalOnTld]);

    useEffect(() => {
        loadDTGUptakeAmongOvcPatients();
    }, [loadDTGUptakeAmongOvcPatients]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DTG UPTAKE AMONG OVC PATIENTS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={DTGUptakeAmongOvcPatients} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OVCDTGUptakeAmongOvcPatients;
