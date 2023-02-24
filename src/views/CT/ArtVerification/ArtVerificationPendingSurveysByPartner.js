import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as currentOnArtByPartnerSelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';


const ArtVerificationPendingSurveysByPartner = () => {
    const [pendingByPartnerChart, setCurrentOnArtByCountyChart] = useState({});
    const currentOnArtByPartnerData = useSelector(
        currentOnArtByPartnerSelectors.getArtPendingUnverifiedByPartner
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
            yAxis: [{ title: { text: '' } }],
            legend: {
                enabled: false,
                align: 'left',
                verticalAlign: 'top',
                y: 0,
                x: 80,
            },
            tooltip: { shared: true },
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
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={pendingByPartnerChart}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ArtVerificationPendingSurveysByPartner;
