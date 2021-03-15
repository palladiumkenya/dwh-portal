import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as medianTimeTo1stVlByYearSelectors from '../../../selectors/CT/ViralLoad/medianTimeTo1stVlByYear';

const MedianTimeTo1stVlByYear = () => {
    const medianTimeTo1stVlByYearData = useSelector(medianTimeTo1stVlByYearSelectors.getMedianTimeTo1stVlByYear);
    const medianTimeTo1stVlByYear = {
        title: { text: '' },
        xAxis: [{ categories: medianTimeTo1stVlByYearData.years, crosshair: true, title: { text: 'Year of Start' } }],
        yAxis: [
            { title: { text: 'Time (Days)' } },
        ],
        // plotOptions: { spline: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
        legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
        series: [
            { name: 'Time (Days)', data: medianTimeTo1stVlByYearData.times, type: 'spline', color: "#E06F07" },
        ]
    };
    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        MEDIAN TIME TO 1ST VL AFTER ART INITIATION BY YEAR OF ART INITIATION
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={medianTimeTo1stVlByYear} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default MedianTimeTo1stVlByYear;
