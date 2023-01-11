import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as currentOnArtByPartnerSelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';


const ArtVerificationPendingSurveysByPartner = () => {
    const [pendingByPartnerChart, setCurrentOnArtByCountyChart] = useState({});
    const currentOnArtByPartnerData = useSelector(
        currentOnArtByPartnerSelectors.getArtVerificationByPartner
    );

    const loadPendingByPartnerChart = useCallback(async () => {
        setCurrentOnArtByCountyChart({
            title: { text: '' },
            xAxis: [
                {
                    categories: currentOnArtByPartnerData.partners,
                    crosshair: true,
                },
            ],
            yAxis: [{ title: { text: '' }, min: 0 }],
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
                    data: currentOnArtByPartnerData.pending,
                    color: '#01058A',
                    type: 'column',
                },
            ],
        });
    }, [currentOnArtByPartnerData]);

    useEffect(() => {
        loadPendingByPartnerChart();
    }, [loadPendingByPartnerChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UNVERIFIED PENDING SURVEYS BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={pendingByPartnerChart} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ArtVerificationPendingSurveysByPartner;
