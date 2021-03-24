import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as medianTimeToArtStartByCountySelectors from '../../../selectors/CT/NewOnArt/medianTimeToArtStartByCounty';

const MedianTimeToArtStartByCounty = () => {
    const [medianTimeToArtStartByCountyChart, setMedianTimeToArtStartByCountyChart] = useState({});
    const medianTimeToArtStartByCountyData = useSelector(medianTimeToArtStartByCountySelectors.getMedianTimeToArtStartByCounty);

    const loadMedianTimeToArtStartByCounty = useCallback(async () => {
        setMedianTimeToArtStartByCountyChart({
            title: { text: '' },
            xAxis: [{ categories: medianTimeToArtStartByCountyData.counties, title: { text: 'Counties' }, crosshair: true }],
            yAxis: [{ title: { text: 'Time (Months)' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Time (Months)', data: medianTimeToArtStartByCountyData.times, type: 'column', color: "#485969" },
            ]
        });
    }, [medianTimeToArtStartByCountyData]);

    useEffect(() => {
        loadMedianTimeToArtStartByCounty();
    }, [loadMedianTimeToArtStartByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO ART START BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={medianTimeToArtStartByCountyChart} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeToArtStartByCounty;
