import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as artByCountySelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';

const ArtVerificationPendingSurveysByCounty = () => {
    const [currentOnArtByCountyChart, setCurrentOnArtByCountyChart] = useState(
        {}
    );
    const pendingByCountyData = useSelector(
        artByCountySelectors.getArtPendingUnverifiedByCounty
    );

    const loadCurrentOnArtByCountyChart = useCallback(async () => {
        setCurrentOnArtByCountyChart({
            title: { text: '' },
            xAxis: [
                {
                    categories: pendingByCountyData.counties,
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
                    data: pendingByCountyData.pending,
                    color: '#01058A',
                    type: 'column',
                },
            ],
        });
    }, [pendingByCountyData]);

    useEffect(() => {
        loadCurrentOnArtByCountyChart();
    }, [loadCurrentOnArtByCountyChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        UNVERIFIED PENDING SURVEYS BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={currentOnArtByCountyChart}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ArtVerificationPendingSurveysByCounty;
