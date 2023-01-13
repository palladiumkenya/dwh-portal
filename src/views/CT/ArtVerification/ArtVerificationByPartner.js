import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as currentOnArtByPartnerSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtVerifiedByPartner';
import * as verifySelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';

const ArtVerificationByPartner = () => {
    const [currentOnArtByPartnerChart, setCurrentOnArtByPartnerChart] = useState({});
    const currentOnArtByPartnerData = useSelector(
        currentOnArtByPartnerSelectors.getCurrentOnArtByPartner
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
            tooltip: { shared: true },
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
                    data: currentOnArtByPartnerData.currentOnArt,
                    color: '#01058A',
                    type: 'column',
                },
                {
                    name: 'VERIFIED CLIENTS',
                    data: currentOnArtByPartnerData.currentOnArtVerified,
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
                        {currentOnArtByPartnerData.loadingP ? (
                            <Spinner color="danger" />
                        ) : (
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={currentOnArtByPartnerChart}
                            />
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ArtVerificationByPartner;
