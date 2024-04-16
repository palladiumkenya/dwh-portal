import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as artByPartnerSelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';

const ArtVerificationSurveySubmissionByPartner = () => {
    const [currentOnArtByCountyChart, setCurrentOnArtByCountyChart] = useState(
        {}
    );
    const partnerData = useSelector(
        artByPartnerSelectors.getArtVerificationSubmissionByPartner
    );

    const loadCurrentOnArtByCountyChart = useCallback(async () => {
        setCurrentOnArtByCountyChart({
            title: { text: '' },
            xAxis: [
                {
                    categories: partnerData.partners,
                    crosshair: true,
                },
            ],
            yAxis: [{ title: { text: '' }, min: 0 }],
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
                    name: 'UNVERIFIED CLIENTS',
                    data: partnerData.unverified,
                    color: '#8E2C16',
                    type: 'column',
                },
                {
                    name: 'UNVERIFIED SURVEYS SUBMITTED',
                    data: partnerData.received,
                    color: '#01058A',
                    type: 'column',
                },
            ],
        });
    }, [partnerData]);

    useEffect(() => {
        loadCurrentOnArtByCountyChart();
    }, [loadCurrentOnArtByCountyChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        SURVEYS SUBMITTED FOR UNVERIFIED PATIENTS BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        {partnerData.loadingP ? (
                            <Spinner color="danger" />
                        ) : (
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={currentOnArtByCountyChart}
                            />
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ArtVerificationSurveySubmissionByPartner;
