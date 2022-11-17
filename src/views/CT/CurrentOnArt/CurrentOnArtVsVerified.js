import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';
import * as currentOnArtAllSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArt';
import * as currentOnArtSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtOverview';

const CurrentOnArtVsVerified= () => {
    const [currentOnArtChart, setCurrentOnArtChart] = useState({});
    const currentOnArtData = useSelector(
        currentOnArtAllSelectors.getCurrentOnArt
    );
    const currentOnArtVerified = useSelector(
        currentOnArtSelectors.getCurrentOnArtVerified
    );
    const notVerified =
        currentOnArtData - currentOnArtVerified < 0
            ? 0
            : currentOnArtData - currentOnArtVerified;

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
                            color: '#28B294',
                        },
                        {
                            name: 'NOT VERIFIED',
                            y: notVerified,
                            sliced: true,
                            selected: true,
                            color: '#142459',
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
                        CURRENT ON ART VERIFIED VS NOT VERIFIED
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={currentOnArtChart} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12">
                *This indicator is computed and displayed for the last completed month.
            </div>
        </div>
    );
};

export default CurrentOnArtVsVerified;