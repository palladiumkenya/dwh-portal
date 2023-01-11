import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as reasonsSelector from '../../../selectors/CT/ArtVerification/reasonsNonVerified';

const ArtVerificationReasonsUnverified = () => {
    const [pendingByPartnerChart, setCurrentOnArtByCountyChart] = useState({});
    const reasonsData = useSelector(
        reasonsSelector.getArtVerificationReasons
    );

    const loadPendingByPartnerChart = useCallback(async () => {
        setCurrentOnArtByCountyChart({
            title: { text: '' },
            xAxis: [
                {
                    categories: reasonsData.reasons,
                    crosshair: true,
                },
            ],
            yAxis: [{ title: { text: '' } }],
            legend: {
                enabled: false,
                align: 'left',
                verticalAlign: 'top',
                y: 0,
                x: 80,
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        crop: false,
                        overflow: 'none',
                    },
                },
            },
            series: [
                {
                    name: '',
                    data: reasonsData.num,
                    color: '#8E2C16',
                    type: 'column',
                },
            ],
        });
    }, [reasonsData]);

    useEffect(() => {
        loadPendingByPartnerChart();
    }, [loadPendingByPartnerChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        REASONS WHY CLIENTS ARE NOT VERIFIED
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={pendingByPartnerChart} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ArtVerificationReasonsUnverified;
