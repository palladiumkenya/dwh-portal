import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as CALHIVCurrentOnArtSelector from '../../../selectors/CT/OVC/CALHIVCurrentOnArt';
import * as CALHIVOnDTGSelector from '../../../selectors/CT/OVC/CALHIVOnDTG';

const OVCDTGUptakeAmongCALHIV = () => {
    const [DTGUptakeAmongCALHIV, setDTGUptakeAmongCALHIV] = useState({});
    const CALHIVCurrentOnArt = useSelector(CALHIVCurrentOnArtSelector.getCALHIVCurrentOnArtNotInOvc);
    const CALHIVOnDTG = useSelector(CALHIVOnDTGSelector.getCALHIVOnDTG);

    const loadDTGUptakeAmongCALHIV = useCallback(async () => {
        setDTGUptakeAmongCALHIV({
            chart: {
                type: 'column'
            },
            title: { text: '' },
            xAxis: [{ categories: ['CALHIV CURRENT ON ART', 'CALHIV TOTAL ON DTG'], crosshair: true }],
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
                            name: 'CALHIV TOTAL ON DTG',
                            y: CALHIVOnDTG.CALHIVonDTG,
                            color: "#14084D",
                            text: CALHIVOnDTG.CALHIVonDTG?.toLocaleString('en') + ' (' + parseFloat(((CALHIVOnDTG.CALHIVonDTG/CALHIVCurrentOnArt.CALHIVonART)*100).toString()).toFixed(0) + '%)',
                            cText: 'CALHIV TOTAL ON DTG: ' + CALHIVOnDTG.CALHIVonDTG
                        }
                    ]
                },
            ]
        });
    }, [CALHIVCurrentOnArt, CALHIVOnDTG]);

    useEffect(() => {
        loadDTGUptakeAmongCALHIV();
    }, [loadDTGUptakeAmongCALHIV]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        DTG UPTAKE AMONG CALHIV PATIENTS NOT IN OVC
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={DTGUptakeAmongCALHIV} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OVCDTGUptakeAmongCALHIV;
