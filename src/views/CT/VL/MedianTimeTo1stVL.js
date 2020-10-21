import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const MedianTimeTo1stVL = () => {
    const [medianTimeTo1stVL, setMedianTimeTo1stVL] = useState({});

    const loadMedianTimeTo1stVL = useCallback(async () => {
        const result = await getAll('care-treatment/medianTimeToArtByYear');

        let months = [];
        let medianTimeTo1stVL = [];

        for(let i = 0; i < result.length; i++) {
            months.push(result[i].year);
            medianTimeTo1stVL.push(parseInt(result[i].time, 10));
        }

        setMedianTimeTo1stVL({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: months, crosshair: true, title: { text: 'Year of Start' } }],
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
                { name: 'Time (Days)', data: medianTimeTo1stVL, type: 'spline', color: "#E06F07" },
            ]
        });
    }, []);

    useEffect(() => {
        loadMedianTimeTo1stVL();
    }, [loadMedianTimeTo1stVL]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO 1ST VL AFTER ART INITIATION BY YEAR OF ART INITIATION
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={medianTimeTo1stVL} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeTo1stVL;
