import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const MedianTimeToArtStartByCounty = () => {
    const [medianTimeToArtStartByCounty, setMedianTimeToArtStartByCounty] = useState({});

    const loadMedianTimeToArtStartByCounty = useCallback(async () => {
        const result = await getAll('care-treatment/medianTimeToArtByCounty');

        let counties = [];
        let medianTimeToArtStartByCounty = [];

        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].county);
            medianTimeToArtStartByCounty.push(parseInt(result[i].time, 10));
        }

        setMedianTimeToArtStartByCounty({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: counties, crosshair: true, title: { text: 'Counties' } }],
            yAxis: [
                {
                    title: { text: 'Time (Days)', style: { color: Highcharts.getOptions().colors[1] } },
                    labels: { format: '{value}', style: { color: Highcharts.getOptions().colors[1] } },
                    min: 0,
                }
            ],
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Time (Days)', data: medianTimeToArtStartByCounty, type: 'bar', color: "#485969" },
            ]
        });
    }, []);

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
                            <HighchartsReact highcharts={Highcharts} options={medianTimeToArtStartByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeToArtStartByCounty;
