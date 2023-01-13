import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Spinner } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import * as artByCountySelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';

const ArtVerificationPendingSurveysByCounty = () => {
    const [currentOnArtByCountyChart, setCurrentOnArtByCountyChart] = useState({});
    const pendingByCountyData = useSelector(
        artByCountySelectors.getArtVerificationByCounty
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
                        {pendingByCountyData.loadingC ? (
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
}

export default ArtVerificationPendingSurveysByCounty;
