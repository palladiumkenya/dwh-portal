import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as currentOnArtByPartnerSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtVerifiedByPartner';
import * as verifySelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';

const ArtVerificationByPartner = () => {
    const [currentOnArtByPartnerChart, setCurrentOnArtByPartnerChart] = useState({});
    const currentOnArtByPartnerData = useSelector(
        verifySelectors.getArtVerificationByPartnerKHIS
    );

    const loadCurrentOnArtByPartnerChart = useCallback(async () => {
        setCurrentOnArtByPartnerChart({
            title: { text: '' },
            xAxis: [
                {
                    categories: currentOnArtByPartnerData.partners,
                    crosshair: true,
                },
            ],
            yAxis: [{ title: { text: '' } }],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
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
                    stacking: 'percent',
                    tooltip: {
                        valueSuffix: ' ({point.percentage:.0f}%)',
                    },
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
                    name: 'TX CURR',
                    data: currentOnArtByPartnerData.txCurr,
                    color: '#01058A',
                    type: 'column',
                },
                {
                    name: 'VERIFIED CLIENTS',
                    data: currentOnArtByPartnerData.nupiVerified,
                    color: '#1AB394',
                    type: 'column',
                },
            ],
        });
    }, [currentOnArtByPartnerData]);

    useEffect(() => {
        loadCurrentOnArtByPartnerChart();
    }, [loadCurrentOnArtByPartnerChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART VERIFICATION BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={currentOnArtByPartnerChart} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ArtVerificationByPartner;
