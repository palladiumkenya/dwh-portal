import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getAll } from '../../Shared/Api';
import moment from "moment";

const MedianTimeTo1stVL = () => {
    const filters = useSelector(state => state.filters);
    const [medianTimeTo1stVL, setMedianTimeTo1stVL] = useState({});

    const loadMedianTimeTo1stVL = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            facility: filters.facilities,
            partner: filters.partners,
            agency: filters.agencies,
            project: filters.projects,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY"),
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const result = await getAll('care-treatment/vlMedianTimeToFirstVlByYear', params);

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
            // plotOptions: { spline: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: {
                floating: true, layout: 'vertical', align: 'left', verticalAlign: 'top', y: 0, x: 80,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
            },
            series: [
                { name: 'Time (Days)', data: medianTimeTo1stVL, type: 'spline', color: "#E06F07" },
            ]
        });
    }, [filters]);

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
