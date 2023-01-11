import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as statusSelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';

const ArtVerificationSurveySubmission = () => {
    const [currentOnArtChart, setCurrentOnArtChart] = useState({});
    const status = useSelector(
        statusSelectors.getArtVerificationByPartner
    );


    const loadCurrentOnArtBySexChart = useCallback(async () => {
        setCurrentOnArtChart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },
            title: { text: '' },
            tooltip: {
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
            },
            accessibility: { point: { valueSuffix: '%' } },
            plotOptions: {
                pie: {
                    innerSize: '80%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    },
                },
            },
            series: [
                {
                    name: '',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'SUBMITTED SURVEY',
                            y: status.submitted,
                            color: '#01058A',
                        },
                        {
                            name: 'NOT SUBMITTED SURVEY',
                            y: status.notsubmitted,
                            sliced: true,
                            selected: true,
                            color: '#8E2C16',
                        },
                    ],
                },
            ],
        });
    }, [status]);

    useEffect(() => {
        loadCurrentOnArtBySexChart();
    }, [loadCurrentOnArtBySexChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        ART VERIFICATION STATUS
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={currentOnArtChart} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ArtVerificationSurveySubmission;