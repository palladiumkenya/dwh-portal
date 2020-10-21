import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';

const MedianTimeTo1stVLByCounty = () => {
    const [medianTimeTo1stVLByCounty, setMedianTimeTo1stVLByCounty] = useState({});

    const loadMedianTimeTo1stVLByCounty = useCallback(async () => {
        const result = await getAll('care-treatment/vlUptakeByCounty');

        let counties = [];
        let medianTimeTo1stVLByCounty = [];

        for(let i = 0; i < result.length; i++) {
            counties.push(result[i].county);
            medianTimeTo1stVLByCounty.push(parseInt(result[i].vlDone, 10));
        }

        setMedianTimeTo1stVLByCounty({
            chart: { zoomType: 'xy' },
            title: { useHTML: true, text: ' &nbsp;', align: 'left' },
            subtitle: { text: ' ', align: 'left' },
            xAxis: [{ categories: counties, crosshair: true, title: { text: 'County' } }],
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
                { name: 'Time (Days)', data: medianTimeTo1stVLByCounty, type: 'spline', color: "#E06F07" },
            ]
        });
    }, []);

    useEffect(() => {
        loadMedianTimeTo1stVLByCounty();
    }, [loadMedianTimeTo1stVLByCounty]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO 1ST VL AFTER ART INITIATION BY COUNTY
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={medianTimeTo1stVLByCounty} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeTo1stVLByCounty;
