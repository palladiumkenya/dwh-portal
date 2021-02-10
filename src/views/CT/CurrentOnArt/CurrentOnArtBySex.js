import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as currentOnArtByAgeSexSelectors from '../../../selectors/CT/CurrentOnArt/currentOnArtByAgeSex';

const CurrentOnArtBySex = () => {
    const [currentOnArtBySexChart, setCurrentOnArtBySexChart] = useState({});
    const currentOnArtBySexData = useSelector(currentOnArtByAgeSexSelectors.getCurrentOnArtBySex);

    const loadCurrentOnArtBySexChart = useCallback(async () => {
        setCurrentOnArtBySexChart({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: { text: '' },
            tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
            accessibility: { point: { valueSuffix: '%' } },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name:"Current on ART",
                colorByPoint: true,
                data: [
                    { name: 'Female', y: currentOnArtBySexData.currentOnArtFemale, color: "#EA4C8B" },
                    { name: 'Male', y: currentOnArtBySexData.currentOnArtMale, sliced: true, selected: true, color: "#14084D" },
                ]
            }]
        });
    }, [currentOnArtBySexData]);

    useEffect(() => {
        loadCurrentOnArtBySexChart();
    }, [loadCurrentOnArtBySexChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        CURRENT ON ART BY SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={currentOnArtBySexChart} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CurrentOnArtBySex;
