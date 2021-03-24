import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody, CardSubtitle } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as medianTimeToArtStartByYearSelectors from '../../../selectors/CT/NewOnArt/medianTimeToArtStartByYear';

const MedianTimeToArtStartByYear = () => {
    const [medianTimeToArtStartByYearChart, setMedianTimeToArtStartByYearChart] = useState({});
    const medianTimeToArtStartByYearData = useSelector(medianTimeToArtStartByYearSelectors.getMedianTimeToArtStartByYear);

    const loadMedianTimeToArtStartByYearChart = useCallback(async () => {
        setMedianTimeToArtStartByYearChart({
            title: { text: '' },
            xAxis: [{ categories: medianTimeToArtStartByYearData.years, title: { text: 'Year of ART Start' }, crosshair: true }],
            yAxis: [{ title: { text: 'Time (Months)' }}],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Time (Months)', data: medianTimeToArtStartByYearData.times, type: 'spline', color: "#E06F07" },
            ]
        });
    }, [medianTimeToArtStartByYearData]);

    useEffect(() => {
        loadMedianTimeToArtStartByYearChart();
    }, [loadMedianTimeToArtStartByYearChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO ART START BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={medianTimeToArtStartByYearChart} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeToArtStartByYear;
