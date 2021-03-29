import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody } from "reactstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as newOnArtTrendsSelectors from '../../../selectors/CT/NewOnArt/newOnArtTrends';

const NewOnArtTrends = () => {
    const [newOnArtTrendsChart, setNewOnArtTrendsChart] = useState({});
    const newOnArtTrendsData = useSelector(newOnArtTrendsSelectors.getNewOnArtTrends);

    const loadNewOnArtTrendsChart = useCallback(async () => {
        setNewOnArtTrendsChart({
            title: { text: '' },
            xAxis: [{ categories: newOnArtTrendsData.months, title: { text: 'Months' }, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients'}}],
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            tooltip: {
                formatter: function () {
                    return 'Series: TRENDS OF NEWLY STARTED PATIENTS ON ART <br><b>' + this.x +': </b>' + this.y + '</b><br>' + this.point.text;
                }
            },
            series: [
                { name: 'Number of Patients', data: newOnArtTrendsData.txNew, type: 'spline', color: "#E06F07" },
            ]
        });
    }, [newOnArtTrendsData]);

    useEffect(() => {
        loadNewOnArtTrendsChart();
    }, [loadNewOnArtTrendsChart]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        TRENDS OF NEWLY STARTED PATIENTS ON ART
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={newOnArtTrendsChart} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NewOnArtTrends;
