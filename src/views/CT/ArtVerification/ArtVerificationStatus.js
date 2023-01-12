import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as currentOnArtAllSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArt';
import * as currentOnArtSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';
import * as currOnArtKHIS from '../../../selectors/Operational&HIS/Comparison/currOnArtKHIS';
import * as verifySelectors from '../../../selectors/CT/ArtVerification/pendingSurveys';

const ArtVerificationStatus = () => {
    const [currentOnArtChart, setCurrentOnArtChart] = useState({});
    
    const currentOnArtVerified = useSelector(
        verifySelectors.getArtVerificationTotal
    );
	const txcurrKHIS = useSelector(currOnArtKHIS.getCurrOnArtKHIS).totalOnART;
    const notVerified =
        txcurrKHIS - currentOnArtVerified < 0
            ? 0
            : txcurrKHIS - currentOnArtVerified;
    

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
                            name: 'VERIFIED',
                            y: currentOnArtVerified,
                            color: '#2A6329',
                        },
                        {
                            name: 'UNVERIFIED',
                            y: notVerified,
                            sliced: true,
                            selected: true,
                            color: '#8E2C16',
                        },
                    ],
                },
            ],
        });
    }, [notVerified, currentOnArtVerified]);

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

export default ArtVerificationStatus;