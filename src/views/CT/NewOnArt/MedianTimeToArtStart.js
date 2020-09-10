import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MedianTimeToArtStart = ({ globalFilter }) => {
    const [newOnArt, setMedianTimeToArtStart] = useState({});

    useEffect(() => {
        loadMedianTimeToArtStart();
    }, [globalFilter]);

    const loadMedianTimeToArtStart = async () => {
        let params = null;

        if (globalFilter) {
            params = { ...globalFilter };
        }

        const result = [
            {"year":2011,"timeInDays":"644"},
            {"year":2012,"timeInDays":"614"},
            {"year":2013,"timeInDays":"689"},
            {"year":2014,"timeInDays":"659"},
            {"year":2015,"timeInDays":"564"},
            {"year":2016,"timeInDays":"414"},
            {"year":2017,"timeInDays":"644"},
            {"year":2018,"timeInDays":"614"},
            {"year":2019,"timeInDays":"689"},
            {"year":2020,"timeInDays":"659"},
        ];

        let months = [];
        let medianTimeToArtStart = [];

        for(let i = 0; i < result.length; i++) {
            months.push(result[i].year);
            medianTimeToArtStart.push(parseInt(result[i].timeInDays, 10));
        }

        setMedianTimeToArtStart({
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
                { name: 'Time (Days)', data: medianTimeToArtStart, type: 'spline', color: "#E06F07" },
            ]
        });
    };

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO ART START BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={newOnArt} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeToArtStart;
