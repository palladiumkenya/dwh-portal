import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as medianTimeTo1stVlByCountySelectors from '../../../selectors/CT/ViralLoad/medianTimeTo1stVlByCounty';

const MedianTimeTo1stVlByCounty = () => {
    const [medianTimeTo1stVlByCounty, setMedianTimeTo1stVlByCounty] = useState({});
    const medianTimeTo1stVlByCountyData = useSelector(medianTimeTo1stVlByCountySelectors.getMedianTimeTo1stVlByCounty);

    const loadMedianTimeTo1stVlByCounty = useCallback(async () => {
        setMedianTimeTo1stVlByCounty({
            title: { text: '' },
            xAxis: [{ categories: medianTimeTo1stVlByCountyData.counties, crosshair: true, title: { text: 'County'.toUpperCase() } }],
            yAxis: [{ title: { text: 'Time (Months)'.toUpperCase() }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Time (Months)', data: medianTimeTo1stVlByCountyData.times, type: 'spline', color: "#E06F07" },
            ]
        });
    }, [medianTimeTo1stVlByCountyData]);

    useEffect(() => {
        loadMedianTimeTo1stVlByCounty();
    }, [loadMedianTimeTo1stVlByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO 1ST VL AFTER ART INITIATION BY COUNTY*
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={medianTimeTo1stVlByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12">
                {/* *Among those who started ART in the last 12 months. */}
            </div>
        </div>
    );
};

export default MedianTimeTo1stVlByCounty;
